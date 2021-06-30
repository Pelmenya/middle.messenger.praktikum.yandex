import { ERRORS } from "../../src/const/errors.js";
import FormProps from "../../src/types/FormProps.js";
import { Nullable } from "../../src/types/Nullable.js";
import { Options } from "../../src/types/Options.js";

export default class Form {
  form: HTMLFormElement;
  serverError: Nullable<HTMLSpanElement>;
  handlerSubmit?: Nullable<Function>;
  errorLabelClass: string | undefined;
  inputLabelClass: string | undefined;
  inputs: NodeListOf<HTMLInputElement>;
  validatePasswords: boolean;

  private getErrorDescription(type: string): string {
    if (type === "text") return ERRORS.ERROR_TEXT;
    if (type === "email") return ERRORS.ERROR_EMAIL;
    if (type === "password") return ERRORS.ERROR_PASSWORD;
    if (type === "tel") return ERRORS.ERROR_TEL;
    return "";
  }

  private validateInput(input: HTMLInputElement, errorLabel: HTMLSpanElement): boolean {
    if (input.value.length === 0) {
      errorLabel.textContent = ERRORS.ERROR_REQUIRED_FIELD;
    } else if (!input.checkValidity()) {
      errorLabel.textContent = this.getErrorDescription(input.type);
    } else {
      errorLabel.textContent = "";
      return true;
    }
    return false;
  }

  private handlerInputInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.previousElementSibling !== null)
        if (this.inputLabelClass !== undefined)
          if (event.target.previousElementSibling.classList.contains(this.inputLabelClass))
            if (event.target.value !== "")
              event.target.previousElementSibling.classList.remove(
                `${this.inputLabelClass}_hidden`
              );
            else
              event.target.previousElementSibling.classList.add(`${this.inputLabelClass}_hidden`);
    }
  };

  private handlerFocusInput = (event: Event) => {
    this.setServerError("");
    if (event.target instanceof HTMLInputElement) {
      if (event.target.nextElementSibling !== null)
        if (this.errorLabelClass !== undefined)
          if (event.target.nextElementSibling.classList.contains(this.errorLabelClass)) {
            event.target.nextElementSibling.classList.remove(`${this.errorLabelClass}_is-opened`);
            event.target.nextElementSibling.textContent = "";
          }
    }
  };

  private handlerBlurInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.nextElementSibling !== null)
        if (this.errorLabelClass !== undefined)
          if (event.target.nextElementSibling.classList.contains(this.errorLabelClass)) {
            if (
              !this.validateInput(event.target, event.target.nextElementSibling as HTMLSpanElement)
            )
              event.target.nextElementSibling.classList.add(`${this.errorLabelClass}_is-opened`);
          }
    }
  };

  private validatePasswordsFields(): boolean {
    let str: string = "";
    let flag: boolean = true;
    let valid: boolean = true;
    Object.keys(this.inputs).forEach((item: string) => {
      let input: HTMLInputElement = this.inputs[Number(item)];
      if (input.type === "password" && input.name !== "oldPassword") {
        if (input.nextElementSibling !== null)
          if (this.errorLabelClass !== undefined)
            if (input.nextElementSibling.classList.contains(this.errorLabelClass)) {
              input.nextElementSibling.textContent = "";
              input.nextElementSibling.classList.remove(`${this.errorLabelClass}_is-opened`);
            }
        if (flag) {
          str = input.value;
          flag = false;
        } else if (str !== input.value) {
          if (input.nextElementSibling !== null)
            if (this.errorLabelClass !== undefined)
              if (input.nextElementSibling.classList.contains(this.errorLabelClass)) {
                input.nextElementSibling.textContent = ERRORS.ERROR_PASSWORDS;
                input.nextElementSibling.classList.add(`${this.errorLabelClass}_is-opened`);
                valid = false;
              }
        }
      }
    });
    return valid;
  }

  private handlerSubmitForm = (event: Event) => {
    event.preventDefault();
    if (this.validatePasswords) {
      if (this.validatePasswordsFields()) {
        if (typeof this.handlerSubmit === "function") {
          this.handlerSubmit(this.getFormData()).then((data: string) => {
            this.setServerError(data);
          });
        }
      }
    } else {
      if (typeof this.handlerSubmit === "function")
        this.handlerSubmit(this.getFormData()).then((data: string) => {
          this.setServerError(data);
        });
    }
  };

  constructor(props: FormProps) {
    this.errorLabelClass = props.errorLabelClass;
    if (this.errorLabelClass === undefined) this.errorLabelClass = "form__error";
    this.inputLabelClass = props.inputLabelClass;
    if (this.inputLabelClass === undefined) this.inputLabelClass = "form__label";

    this.form = props.container;
    this.serverError = this.form.querySelector(`.${this.errorLabelClass}_server`);
    this.handlerSubmit = props.handlerSubmit;
    this.inputs = this.form.querySelectorAll(".input");
    this.validatePasswords = false;
  }

  public setServerError(data: string) {
    if (this.serverError !== null) this.serverError.textContent = data;
  }

  public getFormData(): Options {
    const formData = { data: {} } as Options;
    Object.keys(this.inputs).forEach((item: string) => {
      formData.data[this.inputs[Number(item)].name] = this.inputs[Number(item)].value;
    });
    return formData;
  }

  public create(): void {
    if (this.inputs !== null) {
      let countPasswordFields: number = 0;
      Object.keys(this.inputs).forEach((item: string) => {
        if (
          this.inputs[Number(item)].type === "password" &&
          this.inputs[Number(item)].name !== "oldPassword"
        )
          countPasswordFields += 1;
        this.inputs[Number(item)].addEventListener("input", this.handlerInputInput);
        this.inputs[Number(item)].addEventListener("focus", this.handlerFocusInput);
        this.inputs[Number(item)].addEventListener("blur", this.handlerBlurInput);
      });
      if (countPasswordFields > 1) this.validatePasswords = true;
    }
    if (this.form !== null) {
      this.form.addEventListener("submit", this.handlerSubmitForm);
    }
  }
}
