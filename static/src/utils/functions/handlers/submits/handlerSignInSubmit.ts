import { currentUser } from "../../../../const/objects/currentUser";
import { Options } from "../../../../types/Options";
import { authAPI } from "../../../api/AuthAPI";
import getCurrentUser from "../../getCurrentUser";
import renderChats from "../../renderChats";

export default function handlerSignInSubmit(options: Options) {
  return authAPI.signin(options).then((data) => {
    if (data.status >= 200 && data.status <= 299) {
      renderChats();
      getCurrentUser().then((data) => {
        if (data !== null) {
          Object.assign(currentUser, data);
        }
      });
    } else {
      const obj = JSON.parse(data.response);
      return obj.reason;
    }
  });
}
