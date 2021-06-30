import { myAccount } from "../../template-parts/my-account/my-account.tmpl";
import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import renderChats from "../../utils/functions/renderChats";
import _ from "lodash";

export default class MyAccountPage extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
    this.create();
  }

  public create(){
    this.addListeners();
  }

  public addListeners() {
    if (this.element !== null) {
      const controlBackBtn = this.element.querySelector(".control__back-btn");
      if (controlBackBtn !== null) controlBackBtn.addEventListener("click", renderChats);
    }
  }

  public render() {
    return _.template(myAccount.tmpl)(this.props);
  }
}
