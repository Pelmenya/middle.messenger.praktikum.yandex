import HTTPTransport from "../classes/HTTPTransport.js";
import BaseAPI from "./BaseAPI.js";
import { Options } from "../../types/Options.js";
import { METHOD } from "../../const/methods.js";
import { URLS_API } from "../../const/urlsAPI.js";

const authAPIInstance = new HTTPTransport(`${URLS_API.BASE}${URLS_API.AUTH}`);

export default class AuthAPI extends BaseAPI {
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
