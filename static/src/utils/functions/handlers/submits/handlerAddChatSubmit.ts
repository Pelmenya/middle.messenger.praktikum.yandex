import Popup from "../../../../../blocks/popup/Popup";
import { Options } from "../../../../types/Options";
import { chatsAPI } from "../../../api/ChatsAPI";
import { store } from "../../../store/storeObj";
import getElementFromStore from "../../getElementFromStore";
import renderChats from "../../renderChats";

export default function handlerAddChatSubmit(options: Options) {
  return chatsAPI
    .createChat(options)
    .then((data) => {
      if (data.status >= 200 && data.status <= 299) {
        const addChatPopupElement: Popup = getElementFromStore(store, "chatsProps", "add_chat");
        if (addChatPopupElement !== null) addChatPopupElement.hide();
        renderChats();
      } else {
        const obj = JSON.parse(data.response);
        return obj.reason;
      }
    })
    .catch((err) => alert(err));
}
