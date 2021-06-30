import Popup from "../../../../../blocks/popup/Popup.js";
import { ERRORS_SERVER } from "../../../../const/errorsServer.js";
import { Options } from "../../../../types/Options.js";
import { chatsAPI } from "../../../api/ChatsAPI.js";
import { usersAPI } from "../../../api/UsersAPI.js";
import { store } from "../../../store/storeObj.js";
import getDataFromStore from "../../getDataFromStrore.js";
import getElementFromStore from "../../getElementFromStore.js";

export default function handlerRemoveUserSubmit(options: Options) {
  return usersAPI
    .searchUser(options)
    .then((data) => {
      if (data.status === 200) {
        const res = JSON.parse(data.response);
        if (res.length > 0) {
          const removeUserPopupElement: Popup = getElementFromStore(store, "chatsProps", "remove_user");
          const currentChatId = getDataFromStore("chatsSelectedProps").block.props.chatId;
          if (currentChatId !== 0) {
            const formData = {
              data: {
                users: [
                  res[0].id,
                ],
                chatId: currentChatId,
              },
            } as Options;
            chatsAPI
              .removeUserFromChat(formData)
              .then((data) => {
                if (data.status === 200) {
                  if (removeUserPopupElement !== null) removeUserPopupElement.hide();
                } else return ERRORS_SERVER.ERROR_REMOVE_USER;
              })
              .catch((err) => console.log(err));
          }
        } else return ERRORS_SERVER.ERROR_SEARCH_USER;
      } else {
        const obj = JSON.parse(data.response);
        return obj.reason;
      }
    })
    .catch((err) => console.log(err));
}
