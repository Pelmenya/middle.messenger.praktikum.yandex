import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { talkerTextMessage } from "./talkerTextMessage.tmpl";
import _ from "lodash";

interface TalkerTextMessageProps extends BlockProps {
  message: string;
  time: string;
}

export default class TalkerTextMessage extends Block<TalkerTextMessageProps> {
  constructor(props: TalkerTextMessageProps) {
    super(props);
  }

  render() {
    return _.template(talkerTextMessage.tmpl)(this.props);
  }
}
