import { store } from "../store/storeObj.js";
import getElementFromStore from "./getElementFromStore.js";
import setAvatarField from "./setAvatarField.js";

export default function setEditPasswordFields(){
  setAvatarField("myAccountPasswordProps");
  setAvatarField("myAccountPasswordProps");
  const userPassword = getElementFromStore(
    store,
    "myAccountPasswordProps",
    "userPasswordFields"
  );
  userPassword.setProps({ oldPassword: "", newPassword: "" });
  userPassword.create();
}