import Card from "../../../blocks/card/Card";
import { LIMIT_CHATS, OFFSET_CHATS } from "../../const/consts";
import { router } from "../../const/objects/router";
import { ROUTES } from "../../const/routes";
import { Nullable } from "../../types/Nullable";
import { Options } from "../../types/Options";
import { RendersBlocks } from "../../types/RendersBlocks";
import { chatsAPI } from "../api/ChatsAPI";
import clearContainer from "./clearContainer";
import getDataFromStore from "./getDataFromStrore";
import getDateOfMessages from "./getDateOfMessages";
import render from "./render";
import setTokensAndSokets from "./setTokensAndSockets";

export default function renderChats() {
  chatsAPI
    .getChats({ data: { offset: OFFSET_CHATS, limit: LIMIT_CHATS } } as Options)
    .then((data) => {
      return JSON.parse(data.response);
    })
    .then((arrChats) => {
      const chatsProps = getDataFromStore("chatsProps");
      let arr: RendersBlocks = [];

      arrChats.forEach((chat: any, index: number) => {
        let lastMessage = "";
        let lastMessageDate = "";
        let dateTime = "";
        if (chat.last_message !== null) {
          const chatLastMessage = JSON.parse(chat.last_message);
          lastMessage = chatLastMessage.content;
          lastMessageDate = getDateOfMessages(chatLastMessage.time.slice(0, 10));
          dateTime = chatLastMessage.time.slice(0, 10);
        }
        arr.push({
          query: ".chats-list__container",
          block: new Card({
            tagNameBlock: "div",
            classListBlock: [
              "card",
            ],
            tabIndex: index + 2,
            displayBlock: "flex",
            title: chat.title,
            name: `${chat.title}${Math.random()}`,
            last_message: lastMessage, //бывает глюк при перезагрузки страницы, прилетает не то последнее сообщение
            date: lastMessageDate,
            datetime: dateTime,
            unread_count: chat.unread_count,
            id: chat.id,
            token: null,
            socket: null,
          }),
        });
      });

      router.go(ROUTES.CHATS);
      const container: Nullable<HTMLElement> = document.querySelector(".chats-list__container");
      if (container != null) {
        clearContainer(container);
        render(arr);
      }

      chatsProps.elements = chatsProps.elements.filter((item: any) => {
        return !(item.block instanceof Card);
      });

      chatsProps.elements = [
        ...chatsProps.elements,
        ...arr,
      ];

      setTokensAndSokets();
    })
    .catch((err) => alert(err));
}
