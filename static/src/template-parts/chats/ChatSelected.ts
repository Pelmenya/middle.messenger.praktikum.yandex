import Popup from "../../../blocks/popup/Popup.js";
import BlockProps from "../../types/BlockProps.js";
import { Nullable } from "../../types/Nullable.js";
import Block from "../../utils/classes/Block.js";
import getElementFromStore from "../../utils/functions/getElementFromStore.js";
import { store } from "../../utils/store/storeObj.js";
import { chatSelected } from "./chatSelected.tmpl.js";

interface ChatSelectedProps extends BlockProps {
  title: string;
  name_chat: string;
  chatId: number;
}

export default class ChatSelected extends Block<ChatSelectedProps> {
  constructor(props: ChatSelectedProps) {
    super(props);
    this.addEventListeners();
  }

  addEventListeners = () => {
    if (this.element !== null) {
      const menuUser: Nullable<HTMLElement> = this.element.querySelector(
        ".form-window_messages-list-header"
      );
      const editUserBtn: Nullable<HTMLElement> = this.element.querySelector(
        ".messages-list__settings"
      );
      const addUserBtn: Nullable<HTMLElement> = this.element.querySelector(
        ".menu__button_add-user"
      );
      const removeUserBtn: Nullable<HTMLElement> = this.element.querySelector(
        ".menu__button_remove-user"
      );

      this.element.addEventListener("mousedown", () => {
        if (this.props.name_chat !== undefined)
          getElementFromStore(store, "chatsProps", this.props.name_chat).element.classList.add(
            "card__active"
          );
      });

      if (editUserBtn !== null && menuUser !== null)
        editUserBtn.addEventListener("click", () => {
          menuUser.classList.toggle("form-window_is-opened");
        });

      if (addUserBtn !== null && menuUser !== null)
        addUserBtn.addEventListener("click", () => {
          const addUserPopupElement: Popup = getElementFromStore(store, "chatsProps", "add_user");
          menuUser.classList.toggle("form-window_is-opened");
          addUserPopupElement.show();
        });

      if (removeUserBtn !== null && menuUser !== null)
        removeUserBtn.addEventListener("click", () => {
          const removeUserPopupElement: Popup = getElementFromStore(store, "chatsProps", "remove_user");
          menuUser.classList.toggle("form-window_is-opened");
          removeUserPopupElement.show();
        });
    }
  };

  render() {
    return _.template(chatSelected.tmpl)(this.props);
  }
}
