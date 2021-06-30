import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { myTextMessage } from "./myTextMessage.tmpl";
import _ from "lodash";

interface MyTextMessageProps extends BlockProps{
  message: string;
  time: string;
}

export default class MyTextMessage extends Block<MyTextMessageProps> {
  constructor(props: MyTextMessageProps) {
    super(props);
  }

  render() {
    return _.template(myTextMessage.tmpl)(this.props);
  }
}