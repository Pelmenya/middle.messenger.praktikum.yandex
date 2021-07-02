import { store } from "../store/storeObj";
import getDataFromStore from "./getDataFromStrore";
import getElementFromStore from "./getElementFromStore";
import setAvatarField from "./setAvatarField";

export default function setEditUserFields() {
  setAvatarField("myAccountDataProps");
  setAvatarField("myAccountDataProps");
  const userData = getElementFromStore(store, "myAccountDataProps", "userDataFields");
  userData.setProps({ currentUserProps: getDataFromStore("currentUser") });
  userData.create();
}
