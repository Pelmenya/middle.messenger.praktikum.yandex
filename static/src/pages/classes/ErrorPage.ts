import BlockProps from "../../types/BlockProps.js";
import Block from "../../utils/classes/Block.js";
import { err } from "../../template-parts/error.tmpl.js";

interface ErrorPageProps extends BlockProps {
  title: string;
  message: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  render() {
    return _.template(err.tmpl)(this.props);
  }
}
