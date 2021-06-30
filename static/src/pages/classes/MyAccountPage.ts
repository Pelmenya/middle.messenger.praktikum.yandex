import { myAccount } from "../../template-parts/my-account/my-account.tmpl.js";
import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import renderChats from "../../utils/functions/renderChats.js";

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
