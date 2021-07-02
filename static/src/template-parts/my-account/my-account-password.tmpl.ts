import { Template } from "../../types/Template";

export const myAccountPassword: Template = {
  tmpl:
    '<form class="form account__form account__form_password" name="newpassword">\
      <div class="account__wrap-row">\
        <label class="account__label" for="old-password">Старый пароль</label>\
        <input value="<%=oldPassword%>" name="oldPassword" id="old-password" class="input account__input" type="password" required minlength="6">\
        <span class="form__error form__error_account"></span>\
      </div>\
      <hr class="account__spliter">\
      <div class="account__wrap-row">\
        <label class="account__label" for="first-new-password">Новый пароль</label>\
        <input value="<%=newPassword%>" name="newPassword" id="first-new-password" class="input account__input" type="password" required minlength="6">\
        <span class="form__error form__error_account"></span>\
      </div>\
      <hr class="account__spliter">\
      <div class="account__wrap-row">\
        <label class="account__label" for="second-new-password">Повторите новый пароль</label>\
        <input value="<%=newPassword%>" name="newPassword" id="second-new-password" class="input account__input" type="password" required minlength="6">\
        <span class="form__error form__error_account"></span>\
      </div>\
      <div class="account__wrap-col account__wrap-col_buttons">\
        <span class="form__error form__error_server"></span>\
      </div>\
    </form>',
};
