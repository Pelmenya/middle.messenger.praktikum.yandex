import { myAccount } from "../../template-parts/my-account/my-account.tmpl.js";
import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { router } from "../../utils/classes/Router.js";
import setUserFields from "../../utils/functions/setUserFields.js";

export default class MyAccountDataPage extends Block<BlockProps> {
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
      if (controlBackBtn !== null)
        controlBackBtn.addEventListener("click", () => {
          setUserFields();
          router.back();
        });
    }
  }

  render() {
    return _.template(myAccount.tmpl)();
  }
}
