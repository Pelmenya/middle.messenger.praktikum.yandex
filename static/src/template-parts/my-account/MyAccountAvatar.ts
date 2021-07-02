import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import getElementFromStore from "../../utils/functions/getElementFromStore";
import { store } from "../../utils/store/storeObj";
import { myAccountAvatar } from "./my-account-avatar.tmpl";
import _ from "lodash";

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
