import Form from "../../../blocks/form/Form.js";
import BlockProps from "../../types/BlockProps.js";
import CurrentUser from "../../types/CurrentUser.js";
import { Nullable } from "../../types/Nullable.js";
import Block from "../../utils/classes/Block.js";
import { myAccountUser } from "./my-account-user.tmpl.js";
import handlerEditUserDataSubmit from "../../utils/functions/handlers/submits/handlerEditUserDataSubmit.js";

interface MyAccountUserProps extends BlockProps {
  disabled: string;
  phone_pattern: string;
  email_pattern: string;
  currentUserProps: Nullable<CurrentUser>;
}

export default class MyAccountUser extends Block<MyAccountUserProps> {
  constructor(props: MyAccountUserProps) {
    super(props);
    this.create();
  }

  public create() {
    if (this.element !== null) {
      const formContainer: Nullable<HTMLFormElement> = this.element.querySelector("form");
      if (formContainer !== null) {
        const form = new Form({
          container: formContainer,
          handlerSubmit: handlerEditUserDataSubmit,
        });
        form.create();
      }
    }
  }

  public render() {
    return _.template(myAccountUser.tmpl)(this.props);
  }
}
