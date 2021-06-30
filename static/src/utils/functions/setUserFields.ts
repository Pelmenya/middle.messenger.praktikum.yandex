import { store } from "../store/storeObj.js";
import getDataFromStore from "./getDataFromStrore.js";
import getElementFromStore from "./getElementFromStore.js";
import setAvatarField from "./setAvatarField.js";

export default function setUserFields() {
   setAvatarField("myAccountProps");
  const user = getElementFromStore(store, "myAccountProps", "userFields");
  user.setProps({ currentUserProps: getDataFromStore("currentUser") });
 
}
