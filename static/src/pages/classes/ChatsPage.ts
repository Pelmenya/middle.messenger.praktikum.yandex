import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { chats } from "../../template-parts/chats/chats.tmpl.js";
import { router } from "../../utils/classes/Router.js";
import { ROUTES } from "../../const/routes.js";
import getElementFromStore from "../../utils/functions/getElementFromStore.js";
import { store } from "../../utils/store/storeObj.js";
import { Nullable } from "../../types/Nullable.js";
import Popup from "../../../blocks/popup/Popup.js";
import setUserFields from "../../utils/functions/setUserFields.js";


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
    return _.template(chats.tmpl)(this.props);
  }
}
