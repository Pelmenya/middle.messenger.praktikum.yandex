import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { ROUTES } from "../../const/routes";
import getElementFromStore from "../../utils/functions/getElementFromStore";
import { store } from "../../utils/store/storeObj";
import { Nullable } from "../../types/Nullable";
import Popup from "../../../blocks/popup/Popup";
import setUserFields from "../../utils/functions/setUserFields";
import { chatsPage } from "./chatsPage.tmpl";
import clearContainer from "../../utils/functions/clearContainer";
import _ from "lodash";
import { router } from "../../const/objects/router";

export default class ChatsPage extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
    this.addEventListeners();
  }

  addEventListeners = () => {
    if (this.element !== null) {
      const myAccountBtn: Nullable<HTMLButtonElement> = this.element.querySelector(
        ".chats__nav-btn_my-account"
      );
      const createChartBtn: Nullable<HTMLButtonElement> = this.element.querySelector(
        ".chats__nav-btn_create"
      );
      const chatsHeader: Nullable<HTMLButtonElement> = this.element.querySelector(".chats__header");

      if (chatsHeader !== null) {
        chatsHeader.addEventListener("click", (event: Event) => {
          if (event.target instanceof HTMLElement) {
            const chatNotSelected = getElementFromStore(store, "chatsProps", "chatNotSelected");
            const chatSelected = getElementFromStore(store, "chatsProps", "chatSelected");
            const messagesContainer = chatSelected.element.querySelector(
              ".messages-list__container"
            );
            clearContainer(messagesContainer);
            chatSelected.hide();
            chatNotSelected.show();
          }
        });
      }

      if (createChartBtn !== null) {
        getElementFromStore(store, "chatsProps", "add_chat");
        createChartBtn.addEventListener("click", () => {
          const addChatPopupElement: Popup = getElementFromStore(store, "chatsProps", "add_chat");
          if (addChatPopupElement !== undefined) {
            addChatPopupElement.show();
          }
        });
      }

      if (myAccountBtn !== null) {
        myAccountBtn.addEventListener("click", () => {
          setUserFields();
          router.go(ROUTES.MY_ACCOUNT);
        });
      }
    }
  };

  render() {
    return _.template(chatsPage.tmpl)(this.props);
  }
}
