import BlockProps from "../../types/BlockProps";
import Block from "../../utils/classes/Block";
import { chatNotSelected } from "./chatNotSelected.tmpl";
import _ from "lodash";

interface ChatNotSelectedProps extends BlockProps{
  message: string;
}

export default class ChatNotSelected extends Block<ChatNotSelectedProps> {
  constructor(props: ChatNotSelectedProps) {
    super(props);
  }

  render() {
    return _.template(chatNotSelected.tmpl)(this.props);
  }
}