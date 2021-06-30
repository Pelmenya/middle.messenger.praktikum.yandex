import BlockProps from "../../src/types/BlockProps.js";
import Block from "../../src/utils/classes/Block.js";
import { button } from "./button.tmpl.js";

interface ButtonProps extends BlockProps {
  name: string;
  classList: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  render() {
    return _.template(button.tmpl)(this.props);
  }
}
