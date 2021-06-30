import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { err } from "../../template-parts/error.tmpl";
import _ from "lodash";

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
