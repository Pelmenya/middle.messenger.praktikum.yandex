import { store } from "../store/storeObj.js";
import getDataFromStore from "./getDataFromStrore.js";
import getElementFromStore from "./getElementFromStore.js";
import setAvatarField from "./setAvatarField.js";

export default function setEditUserFields() {
  setAvatarField("myAccountDataProps");
  setAvatarField("myAccountDataProps");
  const userData = getElementFromStore(store, "myAccountDataProps", "userDataFields");
  userData.setProps({ currentUserProps: getDataFromStore("currentUser") });
  userData.create();
}
