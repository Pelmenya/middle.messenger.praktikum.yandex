import HTTPTransport from "../classes/HTTPTransport";
import { Options } from "../../types/Options";
import { METHOD } from "../../const/methods";
import { URLS_API } from "../../const/urlsAPI";

const authAPIInstance = new HTTPTransport(`${URLS_API.BASE}${URLS_API.AUTH}`);

export default class AuthAPI {
  getCurrentUser() {
    return authAPIInstance.get(URLS_API.USER);
  }

  signup(options: Options) {
    return authAPIInstance.post(URLS_API.SIGNUP, options);
  }

  logOut() {
    const options: Options = { method: METHOD.POST };
    return authAPIInstance.post(URLS_API.LOGOUT, options);
  }

  signin(options: Options) {
    return authAPIInstance.post(URLS_API.SIGNIN, options);
  }
}

export const authAPI = new AuthAPI();
