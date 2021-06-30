import { URLS_API } from "../../const/urlsAPI";
import { Options } from "../../types/Options";
import HTTPTransport from "../classes/HTTPTransport";

const usersAPIInstance = new HTTPTransport(`${URLS_API.BASE}${URLS_API.USER}`);

export default class UsersAPI {
  searchUser(options: Options) {
    return usersAPIInstance.post(URLS_API.SEARCH_USER, options);
  }

  putUserProfile(options: Options) {
    return usersAPIInstance.put(URLS_API.PROFILE, options);
  }

  putUserPassword(options: Options) {
    return usersAPIInstance.put(URLS_API.PASSWORD, options);
  }

  putUserAvatar(options: Options) {
    return usersAPIInstance.put(`${URLS_API.PROFILE}${URLS_API.AVATAR}`, options);
  }

  
}

export const usersAPI = new UsersAPI();
