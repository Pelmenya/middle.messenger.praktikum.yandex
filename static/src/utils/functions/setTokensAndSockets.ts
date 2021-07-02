import Card from "../../../blocks/card/Card";
import { METHOD } from "../../const/methods";
import { URLS_API } from "../../const/urlsAPI";
import { chatsAPI } from "../api/ChatsAPI";
import DataWebSocket from "../classes/DataWebSocket";
import getDataFromStore from "./getDataFromStrore";

export default function setTokensAndSokets() {
  const chatsProps = getDataFromStore("chatsProps");
  const currentUser = getDataFromStore("currentUser");

  chatsProps.elements.forEach((item: any) => {
    if (item.block instanceof Card) {
      const idChat = item.block.props.id;
      chatsAPI
        .getChatToken({ method: METHOD.POST, id: idChat })
        .then((data) => {
          if (item.block instanceof Card) {
            item.block.props.token = JSON.parse(data.response).token;
            item.block.props.socket = new DataWebSocket({
              path: `${URLS_API.WEBSOCKET}${URLS_API.CHATS}/${currentUser.id}/${idChat}/${item.block
                .props.token}`,
            });
            item.block.props.socket.create();
          }
        })
        .catch((err) => alert(err));
    }
  });
}
