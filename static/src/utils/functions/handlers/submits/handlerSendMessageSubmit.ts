import { ERRORS } from "../../../../const/errors";
import { MESSAGES } from "../../../../const/messages";
import { TYPE_SOCKET_DATA } from "../../../../const/typeSocketData";
import { Options } from "../../../../types/Options";
import DataWebSocket from "../../../classes/DataWebSocket";

export default function handlerSendMessageSubmit(options: Options, socket: DataWebSocket) {
  return new Promise((res, rej) => {
    const { data } = options;
    if (socket.dataWebSocket !== null) {
      if (socket.dataWebSocket.readyState === socket.dataWebSocket.CLOSED) {
        const connecting = new Promise((resolve) => {
          socket.create();
          resolve;
        });

        connecting.then(() => {
          if (socket.dataWebSocket !== null)
            socket.dataWebSocket.send(
              JSON.stringify({ content: `${data.message}`, type: TYPE_SOCKET_DATA.TEXT })
            );
        });
      } else if (socket.dataWebSocket.readyState === socket.dataWebSocket.OPEN) {
        socket.dataWebSocket.send(
          JSON.stringify({ content: `${data.message}`, type: TYPE_SOCKET_DATA.TEXT })
        );
      }

      res(MESSAGES.MESSAGE_SEND);
    } else {
      rej(ERRORS.ERROR_SEND_MESSAGE);
    }
  });
}
