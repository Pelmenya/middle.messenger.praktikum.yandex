import { Template } from "../types/Template";

export const formSignIn: Template = {
  tmpl:
    '<div class="form-window form-window_is-opened">\
      <div class="form-window__content form-window__content_login">\
        <h1 class="form-window__title">Вход</h1>\
        <form class="form form__signin" name="signin">\
          <div class="form__wrap">\
            <label class="form__label form__label_hidden" for="login-signin">Логин</label>\
            <input class="input" name="login" id="login-signin" type="text" placeholder="Логин" required minlength="2" maxlength="30">\
            <span class="form__error form__error_login"></span>\
            <label class="form__label form__label_hidden" for="password-signin">Пароль</label>\
            <input class="input" name="password" id="password-signin" type="password" placeholder="Пароль" required  minlength="6">\
            <span class="form__error form__error_password"></span>\
          </div>\
          <div class="form__wrap form__wrap_buttons">\
          <span class="form__error form__error_server"></span>\
          </div>\
        </form>\
      </div>\
    </div>',
};
