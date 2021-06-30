import { ROUTES } from "../../const/routes.js";
import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { router } from "../../utils/classes/Router.js";
import handlerLogOutUser from "../../utils/functions/handlers/handlerLogOutUser.js";
import setEditPasswordFields from "../../utils/functions/setEditPasswordFields.js";
import setEditUserFields from "../../utils/functions/setEditUserFields.js";
import { myAccountUserMenu } from "./my-account-user-menu.tmpl.js";

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
