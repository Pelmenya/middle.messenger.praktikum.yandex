import Card from "../../../blocks/card/Card.js";
import { chatsProps } from "../../const/objects/chatsProps.js";
import { ROUTES } from "../../const/routes.js";
import { RendersBlocks } from "../../types/RendersBlocks.js";
import { chatsAPI } from "../api/ChatsAPI.js";
import { router } from "../classes/Router.js";
import clearChats from "./clearChats.js";
import render from "./render.js";

export default function renderChats() {
  chatsAPI
    .getChats()
    .then((data) => {
      let arr: RendersBlocks = [];
      const arrChats = JSON.parse(data.response);
      arrChats.forEach((chat: any, index: number) => {
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
            last_message: chat.message,
            unread_count: chat.unread_count,
            id: chat.id,
          }),
        });
      });

      router.go(ROUTES.CHATS);
      clearChats();
      render(arr);

      chatsProps.elements = [
        ...chatsProps.elements,
        ...arr,
      ];
    })
    .catch((err) => console.log(err));
}
