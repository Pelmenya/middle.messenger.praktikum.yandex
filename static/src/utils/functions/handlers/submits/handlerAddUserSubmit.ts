import Popup from "../../../../../blocks/popup/Popup";
import { ERRORS_SERVER } from "../../../../const/errorsServer";
import { Options } from "../../../../types/Options";
import { chatsAPI } from "../../../api/ChatsAPI";
import { usersAPI } from "../../../api/UsersAPI";
import { store } from "../../../store/storeObj";
import getDataFromStore from "../../getDataFromStrore";
import getElementFromStore from "../../getElementFromStore";

export default function handlerAddUserSubmit(options: Options) {
  return usersAPI
    .searchUser(options)
    .then((data) => {
      if (data.status >= 200 && data.status <= 299) {
        const res = JSON.parse(data.response);
        if (res.length > 0) {
          const addUserPopupElement: Popup = getElementFromStore(store, "chatsProps", "add_user");
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
              .addUserToChat(formData)
              .then((data) => {
                if (data.status >= 200 && data.status <= 299) {
                  if (addUserPopupElement !== null) addUserPopupElement.hide();
                } else return ERRORS_SERVER.ERROR_ADD_USER;
              })
              .catch((err) => alert(err));
          }
        } else return ERRORS_SERVER.ERROR_SEARCH_USER;
      } else {
        const obj = JSON.parse(data.response);
        return obj.reason;
      }
    })
    .catch((err) => alert(err));
}
