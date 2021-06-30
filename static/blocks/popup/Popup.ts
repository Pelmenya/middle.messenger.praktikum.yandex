import Block from "../../src/utils/classes/Block.js";
import BlockProps from "../../src/types/BlockProps.js";
import { popup } from "./popup.tmpl.js";
import Form from "../form/Form.js";
import { Nullable } from "../../src/types/Nullable.js";

export interface PopupProps extends BlockProps {
  title: string;
  field: string;
  placeholder: string;
  handlerSubmit: Function;
}

export interface PopupAvatarProps extends PopupProps {
  error_title: string;
  load: string;
  label: string;
  error: string;
}

export default class Popup extends Block<PopupProps | PopupAvatarProps > {
  constructor(props: PopupProps) {
    super(props);
    this.create();
  }

  public create() {
    this.addEventsListeners();
    if (this.element !== null) {
      const popupContent = this.getContent();
      if (popupContent !== null) {
        const formContainer: Nullable<HTMLFormElement> = popupContent.querySelector("form");
        if (formContainer !== null) {
          const form = new Form({
            container: formContainer,
            handlerSubmit: this.props.handlerSubmit,
          });
          form.create();
        }
      }
    }
  }

  public addEventsListeners() {
    if (this.element !== null) this.element.addEventListener("mousedown", this.closeClick);
    window.addEventListener("keydown", this.closeKeyDown);
  }

  public removeEventsListeners() {
    if (this.element !== null) this.element.removeEventListener("mousedown", this.closeClick);
    window.removeEventListener("keydown", this.closeKeyDown);
  }

  public closeClick = (event: Event) => {
    if (event.target instanceof HTMLElement && this.element !== null)
      if (
        event.target.classList.value === this.element.classList.value ||
        event.target.classList.value === `${this.element.classList[0]}__content`
      ) {
        this.hide();
      }
  };

  public closeKeyDown = (event: Event) => {
    if (event instanceof KeyboardEvent)
      if (event.key === "Escape") {
        this.hide();
      }
  };

  public render() {
    return _.template(popup.tmpl)(this.props);
  }
}
