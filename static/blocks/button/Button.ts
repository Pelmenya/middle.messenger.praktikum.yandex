import BlockProps from "../../src/types/BlockProps";
import Block from "../../src/utils/classes/Block";
import { button } from "./button.tmpl";
import _ from "lodash";

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
