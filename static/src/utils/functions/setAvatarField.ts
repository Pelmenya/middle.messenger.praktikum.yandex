import { currentUser } from "../../const/objects/currentUser";
import { URLS_API } from "../../const/urlsAPI";
import { store } from "../store/storeObj";
import getElementFromStore from "./getElementFromStore";

export default function setAvatarField(pageProps: string) {
  const avatar = getElementFromStore(store, pageProps, "avatarField");
  if (currentUser.avatar !== null)
  avatar.setProps({
    avatar: `${URLS_API.BASE}${URLS_API.RESOURCES}${currentUser.avatar}`,
    display: "flex",
  });
  avatar.create();
}
