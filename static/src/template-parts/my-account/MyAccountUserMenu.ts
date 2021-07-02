import { ROUTES } from "../../const/routes";
import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import handlerLogOutUser from "../../utils/functions/handlers/handlerLogOutUser";
import setEditPasswordFields from "../../utils/functions/setEditPasswordFields";
import setEditUserFields from "../../utils/functions/setEditUserFields";
import { myAccountUserMenu } from "./my-account-user-menu.tmpl";
import _ from "lodash";
import { router } from "../../const/objects/router";

export default class MyAccountUserMenu extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
    this.addEventLesteners();
  }

  public addEventLesteners() {
    if (this.element !== null) {
      const logOutUserBtn = this.element.querySelector(".account__edit-btn_log-out");
      if (logOutUserBtn !== null) logOutUserBtn.addEventListener("click", handlerLogOutUser);

      const editDataBtn = this.element.querySelector(".account__edit-btn_data");
      if (editDataBtn !== null)
        editDataBtn.addEventListener("click", () => {
          setEditUserFields();
          router.go(ROUTES.MY_ACCOUNT_DATA);
        });

      const editPasswordBtn = this.element.querySelector(".account__edit-btn_password");
      if (editPasswordBtn !== null)
        editPasswordBtn.addEventListener("click", () => {
          setEditPasswordFields();
          router.go(ROUTES.MY_ACCOUNT_PASSWORD);
        });
    }
  }

  public render() {
    return _.template(myAccountUserMenu.tmpl)();
  }
}
