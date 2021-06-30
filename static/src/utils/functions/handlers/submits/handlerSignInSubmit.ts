import { currentUser } from "../../../../const/objects/currentUser.js";
import { Options } from "../../../../types/Options.js";
import { authAPI } from "../../../api/AuthAPI.js";
import getCurrentUser from "../../getCurrentUser.js";
import renderChats from "../../renderChats.js";

export default function handlerSignInSubmit(options: Options) {
  return authAPI.signin(options).then((data) => {
    if (data.status === 200) {
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
