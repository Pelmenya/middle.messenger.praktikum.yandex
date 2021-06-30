import ChatSelected from "../../template-parts/chats/ChatSelected.js";

export const chatsSelectedProps = {
  query: "div .body__container .body__container_is-opened",
  block: new ChatSelected({
    tagNameBlock: "aside",
    classListBlock: [
      "sidebar",
      "chat",
      "sidebar_is-closed",
    ],
    displayBlock: "flex",
    name: "chatSelected",
    title: "",
    name_chat: "",
    chatId: 0,
  }),
};
