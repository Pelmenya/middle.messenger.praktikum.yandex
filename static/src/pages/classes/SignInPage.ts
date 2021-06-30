
import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { formSignIn } from "../../template-parts/signIn.tmpl";
import _ from "lodash";

export default class SignInPage extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
  }

  render() {
    return _.template(formSignIn.tmpl)(this.props);
  }
}