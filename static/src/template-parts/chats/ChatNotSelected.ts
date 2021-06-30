import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { chatNotSelected } from "./chatNotSelected.tmpl.js";

export default class ChatNotSelected extends Block<BlockProps> {
  constructor(props: BlockProps) {
    super(props);
  }

  render() {
    return _.template(chatNotSelected.tmpl)(this.props);
  }
}