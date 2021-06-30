import { MESSAGES } from "../../../../const/messages";
import { Options } from "../../../../types/Options";
import { usersAPI } from "../../../api/UsersAPI";

export default function handlerEditUserPasswordSubmit(options: Options) {
  return usersAPI.putUserPassword(options).then((data) => {
    if (data.status >= 200 && data.status <= 299) {
      return MESSAGES.USER_PASSWORD_EDIT
    } else {
      const obj = JSON.parse(data.response);
      return obj.reason;
    }
  });
}