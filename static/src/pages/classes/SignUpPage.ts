import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { formSignUp } from "../../template-parts/signUp.tmpl";
import _ from "lodash";


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