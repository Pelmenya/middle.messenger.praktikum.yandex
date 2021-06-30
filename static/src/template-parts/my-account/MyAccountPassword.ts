import Form from "../../../blocks/form/Form";
import BlockProps from "../../types/BlockProps";
import { Nullable } from "../../types/Nullable";
import Block from "../../utils/classes/Block";
import handlerEditUserPasswordSubmit from "../../utils/functions/handlers/submits/handlerEditUserPassword";
import { myAccountPassword } from "./my-account-password.tmpl";
import _ from "lodash";

interface MyAccountPasswordProps extends BlockProps {
  oldPassword: string;
  newPassword: string;
}

export default class MyAccountPassword extends Block<MyAccountPasswordProps> {
  constructor(props: MyAccountPasswordProps) {
    super(props);
    this.create();
  }

  public create() {
    if (this.element !== null) {
      const formContainer: Nullable<HTMLFormElement> = this.element.querySelector("form");
      if (formContainer !== null) {
        const form = new Form({
          container: formContainer,
          handlerSubmit: handlerEditUserPasswordSubmit,
        });
        form.create();
      }
    }
  }

  public render() {
    return _.template(myAccountPassword.tmpl)(this.props);
  }
}
