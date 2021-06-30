import { MESSAGES } from "../../../../const/messages.js";
import { currentUser } from "../../../../const/objects/currentUser.js";
import { Options } from "../../../../types/Options.js";
import { usersAPI } from "../../../api/UsersAPI.js";
import getCurrentUser from "../../getCurrentUser.js";

export default function handlerEditUserDataSubmit(options: Options) {
  return usersAPI.putUserProfile(options).then((data) => {
    if (data.status === 200) {
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
