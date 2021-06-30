import Block from "../../src/utils/classes/Block";
import BlockProps from "../../src/types/BlockProps";
import { card } from "./card.tmpl";
import { Nullable } from "../../src/types/Nullable";
import getElementFromStore from "../../src/utils/functions/getElementFromStore";
import { store } from "../../src/utils/store/storeObj";
import DataWebSocket from "../../src/utils/classes/DataWebSocket";
import clearContainer from "../../src/utils/functions/clearContainer";
import renderMessages from "../../src/utils/functions/renderMessages";
import scrollMessagesContainer from "../../src/utils/functions/scrollMessagesContainer";
import _ from "lodash";

interface CardProps extends BlockProps {
  title: string;
  name: string;
  last_message: Nullable<string>;
  datetime: Nullable<string>;
  date: Nullable<string>;
  unread_count: number;
  id: number;
  token: Nullable<string>;
  socket: Nullable<DataWebSocket>;
}

export default class Card extends Block<CardProps> {
  chatNotSelected: any;
  chatSelected: any;
  container: Nullable<ParentNode>;

  constructor(props: CardProps) {
    super(props);
    this.chatNotSelected = getElementFromStore(store, "chatsProps", "chatNotSelected");
    this.chatSelected = getElementFromStore(store, "chatsProps", "chatSelected");
    this.container = null;
    this.create();
  }

  create() {
    this.addEventListeners();
  }

  public handlerMouseDownCard = () => {
    if (this.props.socket !== null) {
      this.chatNotSelected.hide();

      this.chatSelected.setProps({
        title: this.props.title,
        name_chat: this.props.name,
        chatId: this.props.id,
      });
      this.chatSelected.setProps({
        title: this.props.title,
        name_chat: this.props.name,
        chatId: this.props.id,
      }); // так и не понял, почему со второго рвзв

      this.chatSelected.initFormSendMessage();

      const messagesContainer = this.chatSelected.element.querySelector(
        ".messages-list__container"
      );


      clearContainer(messagesContainer);

      if (this.props.socket.messages.length > 0) {
        const messages = [
          ...this.props.socket.messages,
        ];

        messages.reverse();
        renderMessages(messages, messagesContainer);
      }

      this.chatSelected.show();
      this.chatSelected.addEventListeners();
      scrollMessagesContainer(messagesContainer);
    }
  };

  public setNotActiveCards() {
    if (this.container !== null) {
      const cards = this.container.querySelectorAll(".card");
      Object.keys(cards).forEach((item) => {
        cards[Number(item)].classList.remove("card__active");
      });
    }
  }

  public handlerFocusCard = () => {
    if (this.element !== null) this.container = this.element.parentNode;
    this.setNotActiveCards();
  };

  public addEventListeners = () => {
    if (this.element !== null) {
      this.element.addEventListener("mousedown", this.handlerMouseDownCard);
      this.element.addEventListener("focus", this.handlerFocusCard, true);
    }
  };

  public render() {
    return _.template(card.tmpl)(this.props);
  }
}
