import { MESSAGES } from "../../../../const/messages";
import { currentUser } from "../../../../const/objects/currentUser";
import { Options } from "../../../../types/Options";
import { usersAPI } from "../../../api/UsersAPI";
import getCurrentUser from "../../getCurrentUser";

export default function handlerEditUserDataSubmit(options: Options) {
  return usersAPI.putUserProfile(options).then((data) => {
    if (data.status >= 200 && data.status <= 299) {
      getCurrentUser().then((data) => {
        if (data !== null) {
          Object.assign(currentUser, data);
        }
      });
      return MESSAGES.USER_DATA_EDIT;
    } else {
      const obj = JSON.parse(data.response);
      return obj.reason;
    }
  });
}
