import Form from "../../../../../blocks/form/Form.js";
import { ROUTES } from "../../../../const/routes.js";
import { Nullable } from "../../../../types/Nullable.js";
import Router from "../../../classes/Router.js";
import handlerSignUpSubmit from "../submits/handlerSignUpSubmit.js";

export function handlerSignUpPage(router: Router): void {
  const formContainer: Nullable<HTMLFormElement> = document.querySelector(".form__signup");
  if (formContainer !== null) {
    const form = new Form({
      container: formContainer,
      handlerSubmit: handlerSignUpSubmit
    });
    form.create();
  }

  const btn: Nullable<HTMLFormElement> = document.querySelector(".form__button-link");
  if (btn !== null) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      router.go(ROUTES.SIGNIN);
    });
  }
}
