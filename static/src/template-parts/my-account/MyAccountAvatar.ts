import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import getElementFromStore from "../../utils/functions/getElementFromStore.js";
import { store } from "../../utils/store/storeObj.js";
import { myAccountAvatar } from "./my-account-avatar.tmpl.js";

interface MyAccountAvatarProps extends BlockProps {
  avatar: string;
  display: string;
}

export default class MyAccountAvatar extends Block<MyAccountAvatarProps> {
  constructor(props: MyAccountAvatarProps) {
    super(props);
    this.create();
  }

  public create() {
    if (this.element !== null) {
      const avatar = this.element.querySelector(".account__avatar");
      if (avatar !== null)
      avatar.addEventListener("click", ()=> {
        getElementFromStore(store, "myAccountProps", "popupAvatar").show();
      })
    }
  }

  public render() {
    return _.template(myAccountAvatar.tmpl)(this.props);
  }
}
