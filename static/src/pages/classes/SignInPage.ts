
import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { formSignIn } from "../../template-parts/signIn.tmpl.js";

export default class SignInPage extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
  }

  render() {
    return _.template(formSignIn.tmpl)(this.props);
  }
}