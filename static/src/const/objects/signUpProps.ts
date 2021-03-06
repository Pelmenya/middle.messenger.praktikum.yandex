import Button from "../../../blocks/button/Button";
import { PATTERNS } from "../regex";
import { handlerSignUpPage } from "../../utils/functions/handlers/pages/handlerSignUpPage";
import { router } from "./router";

export const signUpProps = {
  tagNameBlock: "main",
  classListBlock: [
    "body",
  ],
  displayBlock: "flex",
  phone: PATTERNS.PATTERN_PHONE,
  email: PATTERNS.PATTERN_EMAIL,
  elements: [
    {
      query: ".form__wrap_buttons",
      block: new Button({
        tagNameBlock: "div",
        name: "submit_btn",
        text: "Зарегистрироваться",
        classList: "button",
      }),
    },
    {
      query: ".form__wrap_buttons",
      block: new Button({
        tagNameBlock: "div",
        name: "link",
        text: "Войти",
        classList: "form__button-link",
      }),
    },
  ],
  handler: () => {
    handlerSignUpPage(router);
  },
};