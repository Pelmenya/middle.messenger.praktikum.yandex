import Form from "../../../../../blocks/form/Form";
import { ROUTES } from "../../../../const/routes";
import { Nullable } from "../../../../types/Nullable";
import Router from "../../../classes/Router";
import handlerSignInSubmit from "../submits/handlerSignInSubmit";

export function handlerSignInPage(router: Router): void {
  const formContainer: Nullable<HTMLFormElement> = document.querySelector(".form__signin");

  if (formContainer !== null) {
    const form = new Form({
      container: formContainer,
      handlerSubmit: handlerSignInSubmit,
    });

    form.create();

    const noAccountBtn: Nullable<HTMLFormElement> = document.querySelector(".form__button-link");
    if (noAccountBtn !== null) {
      noAccountBtn.addEventListener("click", (event) => {
        event.preventDefault();
        router.go(ROUTES.SIGNUP);
      });
    }
  }
}
