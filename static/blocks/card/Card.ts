import Block from "../../src/utils/classes/Block.js";
import BlockProps from "../../src/types/BlockProps.js";
import { card } from "./card.tmpl.js";
import { Nullable } from "../../src/types/Nullable.js";
import getElementFromStore from "../../src/utils/functions/getElementFromStore.js";
import { store } from "../../src/utils/store/storeObj.js";

interface CardProps extends BlockProps {
  title: string;
  name: string;
  last_message: Nullable<string>;
  unread_count: number;
  id: number;
}

export default class Card extends Block<CardProps> {
  chatNotSelected: any;
  chatSelected: any;
  container: Nullable<ParentNode>;

  constructor(props: CardProps) {
    super(props);
    this.chatNotSelected = getElementFromStore(store, "chatsProps", "chatNotSelected");
    this.chatSelected = getElementFromStore(store, "chatsProps", "chatSelected");
    this.container = null;
    this.create();
  }

  create() {
    this.addEventListeners();
  }

  public handlerMouseDownCard = () => {
    this.chatNotSelected.hide();
    this.chatSelected.setProps({
      title: this.props.title,
      name_chat: this.props.name,
      chatId: this.props.id,
    });
    this.chatSelected.setProps({
      title: this.props.title,
      name_chat: this.props.name,
      chatId: this.props.id,
    }); // со второго раза ?
    this.chatSelected.show();
    this.chatSelected.addEventListeners();
  };

  public handlerFocusCard = () => {
    if (this.element !== null) this.container = this.element.parentNode;
    if (this.container !== null) {
      const cards = this.container.querySelectorAll(".card");
      Object.keys(cards).forEach((item) => {
        cards[Number(item)].classList.remove("card__active");
      });
    }
  };
  public addEventListeners = () => {
    if (this.element !== null) {
      this.element.addEventListener("mousedown", this.handlerMouseDownCard);
      this.element.addEventListener("focus", this.handlerFocusCard, true);
    }
  };

  public render() {
    return _.template(card.tmpl)(this.props);
  }
}
