import { store } from "../store/storeObj";
import getElementFromStore from "./getElementFromStore";
import setAvatarField from "./setAvatarField";

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