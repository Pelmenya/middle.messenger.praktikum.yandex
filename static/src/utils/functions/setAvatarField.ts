import { currentUser } from "../../const/objects/currentUser.js";
import { URLS_API } from "../../const/urlsAPI.js";
import { store } from "../store/storeObj.js";
import getElementFromStore from "./getElementFromStore.js";

export default function setAvatarField(pageProps: string) {
  const avatar = getElementFromStore(store, pageProps, "avatarField");
  if (currentUser.avatar !== null)
  avatar.setProps({
    avatar: `${URLS_API.BASE}${URLS_API.RESOURCES}${currentUser.avatar}`,
    display: "flex",
  });
  avatar.create();
}
