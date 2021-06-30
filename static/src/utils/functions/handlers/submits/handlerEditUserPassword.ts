import { MESSAGES } from "../../../../const/messages.js";
import { Options } from "../../../../types/Options.js";
import { usersAPI } from "../../../api/UsersAPI.js";

export default function handlerEditUserPasswordSubmit(options: Options) {
  return usersAPI.putUserPassword(options).then((data) => {
    if (data.status === 200) {
      return MESSAGES.USER_PASSWORD_EDIT
    } else {
      const obj = JSON.parse(data.response);
      return obj.reason;
    }
  });
}