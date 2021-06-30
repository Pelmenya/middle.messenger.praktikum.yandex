import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { formSignUp } from "../../template-parts/signUp.tmpl.js";

 interface SignUpPageProps extends BlockProps {
  phone:string;
  email:string;
}

export default class SignUpPage extends Block<SignUpPageProps> {
  constructor(props: SignUpPageProps) {
    super(props);
  }

  render() {
    return _.template(formSignUp.tmpl)(this.props);
  }
}