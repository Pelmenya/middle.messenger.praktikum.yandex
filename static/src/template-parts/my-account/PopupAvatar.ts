import { popupAvatar } from "./popup-avatar.tmpl.js";
import Popup, {PopupAvatarProps } from "../../../blocks/popup/Popup.js";
import { Nullable } from "../../types/Nullable.js";
import { usersAPI } from "../../utils/api/UsersAPI.js";
import { Options } from "../../types/Options.js";
import getCurrentUser from "../../utils/functions/getCurrentUser.js";
import { currentUser } from "../../const/objects/currentUser.js";
import getElementFromStore from "../../utils/functions/getElementFromStore.js";
import { store } from "../../utils/store/storeObj.js";
import { URLS_API } from "../../const/urlsAPI.js";



export default class PopupAvatar extends Popup {
  constructor(props: PopupAvatarProps) {
    super(props);
  }

  create() {
    if (this.element !== null) {
      this.addEventsListeners();
      const popupContent = this.getContent();
      if (popupContent !== null) {
        const formContainer: Nullable<HTMLFormElement> = popupContent.querySelector("form");
        if (formContainer !== null) {

          formContainer.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = new FormData(formContainer);

            usersAPI.putUserAvatar({ data: form } as Options).then((data) => {
              if (data.status === 200)
                getCurrentUser().then((data) => {
                  if (data !== null) {
                    Object.assign(currentUser, data);
                    if (data.avatar !== null) {
                      this.hide();
                      const avatar = getElementFromStore(store, "myAccountProps", "avatarField");
                      avatar.setProps({
                        avatar: `${URLS_API.BASE}${URLS_API.RESOURCES}${data.avatar}`,
                        display: "flex",
                      });
                      avatar.create();
                    }
                  }
                });
            });
          });
        }
      }
    }
  }

  render() {
    return _.template(popupAvatar.tmpl)(this.props);
  }
}
