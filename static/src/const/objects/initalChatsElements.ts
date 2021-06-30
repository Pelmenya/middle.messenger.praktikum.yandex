import Button from "../../../blocks/button/Button.js";
import Popup from "../../../blocks/popup/Popup.js";
import ChatNotSelected from "../../template-parts/chats/ChatNotSelected.js";
import handlerAddChatSubmit from "../../utils/functions/handlers/submits/handlerAddChatSubmit.js";
import handlerAddUserSubmit from "../../utils/functions/handlers/submits/handlerAddUserSubmit.js";
import handlerRemoveUserSubmit from "../../utils/functions/handlers/submits/handlerRemoveUserSubmit.js";
import { chatsSelectedProps } from "./chatsSelectedProps.js";

export const initalChatsElements = [
  chatsSelectedProps,
  {
    query: "div .body__container .body__container_is-opened",
    block: new ChatNotSelected({
      tagNameBlock: "aside",
      classListBlock: [
        "sidebar",
        "chat",
      ],
      displayBlock: "flex",
      name: "chatNotSelected",
    }),
  },
  {
    query: "main",
    block: new Popup({
      tagNameBlock: "div",
      classListBlock: [
        "popup",
        "popup_add-user",
      ],
      displayBlock: "flex",
      title: "Добавить пользователя",
      name: "add_user",
      field: "login",
      placeholder: "Пользователь",
      handlerSubmit: handlerAddUserSubmit,
    }),
  },
  {
    query: ".popup_add-user .form__wrap_buttons",
    block: new Button({
      tagNameBlock: "div",
      name: "submit_btn",
      text: "Добавить",
      classList: "button form__btn-user form__btn-user_add",
    }),
  },
  {
    query: "main",
    block: new Popup({
      tagNameBlock: "div",
      classListBlock: [
        "popup",
        "popup_remove-user",
      ],
      displayBlock: "flex",
      title: "Удалить пользователя",
      name: "remove_user",
      field: "login",
      placeholder: "Пользователь",
      handlerSubmit: handlerRemoveUserSubmit,
    }),
  },
  {
    query: ".popup_remove-user .form__wrap_buttons",
    block: new Button({
      tagNameBlock: "div",
      name: "submit_btn",
      text: "Удалить",
      classList: "button form__btn-user form__btn-user_remove",
    }),
  },
  {
    query: "main",
    block: new Popup({
      tagNameBlock: "div",
      classListBlock: [
        "popup",
        "popup_add-chat",
      ],
      displayBlock: "flex",
      title: "Добавить чат",
      name: "add_chat",
      field: "title",
      placeholder: "Чат",
      handlerSubmit: handlerAddChatSubmit,
    }),
  },
  {
    query: ".popup_add-chat .form__wrap_buttons",
    block: new Button({
      tagNameBlock: "div",
      name: "submit_btn",
      text: "Добавить",
      classList: "button form__btn-user form__btn-user_chat",
    }),
  },
];
