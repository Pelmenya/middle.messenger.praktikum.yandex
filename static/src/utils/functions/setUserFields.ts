import { store } from "../store/storeObj";
import getDataFromStore from "./getDataFromStrore";
import getElementFromStore from "./getElementFromStore";
import setAvatarField from "./setAvatarField";

export default function setUserFields() {
   setAvatarField("myAccountProps");
  const user = getElementFromStore(store, "myAccountProps", "userFields");
  user.setProps({ currentUserProps: getDataFromStore("currentUser") });
 
}
