import HTTPTransport from "../classes/HTTPTransport";
import { URLS_API } from "../../const/urlsAPI";
import { Options } from "../../types/Options";

const chatsAPIInstance = new HTTPTransport(`${URLS_API.BASE}${URLS_API.CHATS}`);

export default class ChatsAPI {
  getChats(options: Options) {
    return chatsAPIInstance.get(URLS_API.GET_CHATS, options);
  }

  createChat(options: Options) {
    return chatsAPIInstance.post(URLS_API.CREATE_CHAT, options);
  }

  addUserToChat(options: Options) {
    return chatsAPIInstance.put(URLS_API.USERS, options);
  }

  removeUserFromChat(options: Options) {
    return chatsAPIInstance.delete(URLS_API.USERS, options);
  }

  getChatToken(options: Options) {
    return chatsAPIInstance.post(URLS_API.TOKEN, options);
  }

  getCountNewMessagesOfChat(options: Options) {
    return chatsAPIInstance.get(URLS_API.COUNT_OF_NEW_MESSAGES, options);
  }
}

export const chatsAPI = new ChatsAPI();

