import { popupAvatar } from "./popup-avatar.tmpl";
import Popup, {PopupAvatarProps } from "../../../blocks/popup/Popup";
import { Nullable } from "../../types/Nullable";
import { usersAPI } from "../../utils/api/UsersAPI";
import { Options } from "../../types/Options";
import getCurrentUser from "../../utils/functions/getCurrentUser";
import { currentUser } from "../../const/objects/currentUser";
import getElementFromStore from "../../utils/functions/getElementFromStore";
import { store } from "../../utils/store/storeObj";
import { URLS_API } from "../../const/urlsAPI";
import _ from "lodash";


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
              if (data.status >= 200 && data.status <= 299)
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
