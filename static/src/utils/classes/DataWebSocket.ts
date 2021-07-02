import { PART_OF_MESSAGES } from "../../const/consts";
import { EVENTS } from "../../const/events";
import { TYPE_SOCKET_DATA } from "../../const/typeSocketData";
import { Nullable } from "../../types/Nullable";
import getElementFromStore from "../functions/getElementFromStore";
import renderMessages from "../functions/renderMessages";
import scrollMessagesContainer from "../functions/scrollMessagesContainer";
import { store } from "../store/storeObj";

import EventBus from "./Event-Bus";

interface DataWebSocketProps {
  path: string;
}

export default class DataWebSocket {
  public dataWebSocket: Nullable<WebSocket>;
  public props: DataWebSocketProps;
  public messages: Array<any>;
  public count: number;
  public flag: boolean;
  private eventBus: EventBus;

  constructor(props: DataWebSocketProps) {
    const eventBus = new EventBus();

    this.eventBus = eventBus;

    this.dataWebSocket = null;
    this.props = props;
    this.messages = [];
    this.count = 0;
    this.flag = true;
    this.createResource(eventBus);
  }

  public create = () => {
    this.dataWebSocket = new WebSocket(this.props.path);
    this.count = 0;
    this.listen();
  };

  public createResource(eventBus: EventBus): void {
    eventBus.on(EVENTS.OPEN_SOCKET, this.openSocket);
    eventBus.on(EVENTS.MESSAGE_SOKET, this.messageSocket);
    eventBus.on(EVENTS.ERROR_SOCKET, this.errorSocket);
    eventBus.on(EVENTS.CLOSE_SOCKET, this.closeSocket);
  }

  public listen() {
    this.eventBus.emit(EVENTS.OPEN_SOCKET);
    this.eventBus.emit(EVENTS.MESSAGE_SOKET);
    this.eventBus.emit(EVENTS.ERROR_SOCKET);
    this.eventBus.emit(EVENTS.CLOSE_SOCKET);
  }

  public closeSocket = () => {
    if (this.dataWebSocket !== null) {
      this.dataWebSocket.addEventListener("close", (event: CloseEvent) => {
        if (!event.wasClean) {
          this.create();
        }
      });
    }
  };

  public getAllOldMessages = () => {
    if (this.dataWebSocket !== null && this.messages.length === 0) {
      this.dataWebSocket.send(
        JSON.stringify({ content: `${this.count}`, type: TYPE_SOCKET_DATA.GET_OLD })
      );
    }
  };

  public openSocket = () => {
    if (this.dataWebSocket !== null) {
      this.dataWebSocket.addEventListener("open", this.getAllOldMessages);
    }
  };

  public messageSocket = () => {
    if (this.dataWebSocket !== null) {
      this.dataWebSocket.addEventListener("message", (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (this.flag) {
          if (event instanceof MessageEvent) {
            if (data.length < PART_OF_MESSAGES) {
              this.messages = this.messages.concat(data);
              this.flag = false;
              this.count = this.count + data.length;
            } else {
              this.messages = this.messages.concat(data);
              this.count = this.count + PART_OF_MESSAGES;
              if (this.dataWebSocket !== null) {
                this.dataWebSocket.send(
                  JSON.stringify({ content: `${this.count}`, type: TYPE_SOCKET_DATA.GET_OLD })
                );
              }
            }
          }
        } else {
          if (data.type === TYPE_SOCKET_DATA.TEXT) {
            const chatSelected = getElementFromStore(store, "chatsProps", "chatSelected");
            const messagesContainer = chatSelected.element.querySelector(
              ".messages-list__container"
            );
            renderMessages(
              [
                data,
              ],
              messagesContainer
            );

            this.messages.unshift(data)
            scrollMessagesContainer(messagesContainer);
          }
        }
      });
    }
  };

  public errorSocket = () => {
    if (this.dataWebSocket !== null) {
      this.dataWebSocket.addEventListener("error", (error: Event) => {
        if (error instanceof Error) {
          alert(error.message);
        }
      });
    }
  };
}
