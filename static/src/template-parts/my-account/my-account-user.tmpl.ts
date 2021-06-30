import { Template } from "../../types/Template.js";

export const myAccountUser: Template = {
  tmpl:
     '<p class="account__name"><%=currentUserProps.first_name%></p>\
      <form class="form account__form account__form_data" name="edit_data">\
        <div class="account__wrap-row">\
          <label class="account__label" for="email-field">Почта</label>\
          <input value="<%=currentUserProps.email%>" <%=disabled%> name="email" id="email-field" class="input account__input" type="email" required pattern=<%=email_pattern%>>\
          <span class="form__error form__error_account"></span>\
        </div>\
        <hr class="account__spliter">\
        <div class="account__wrap-row">\
          <label class="account__label" for="login-field">Логин</label>\
          <input  value="<%=currentUserProps.login%>" <%=disabled%> name="login" id="login-field" class="input account__input" type="text" required minlength="2" maxlength="30">\
          <span class="form__error form__error_account"></span>\
        </div>\
        <hr class="account__spliter">\
        <div class="account__wrap-row">\
          <label class="account__label" for="first-name">Имя</label>\
          <input value="<%=currentUserProps.first_name%>" <%=disabled%> name="first_name" id="first-name" class="input account__input" type="text" required minlength="2" maxlength="30">\
          <span class="form__error form__error_account"></span>\
        </div>\
        <hr class="account__spliter">\
        <div class="account__wrap-row">\
          <label class="account__label" for="second-name">Фамилия</label>\
          <input  value="<%=currentUserProps.second_name%>" <%=disabled%> name="second_name" id="second-name" class="input account__input" type="text" required minlength="2" maxlength="30">\
          <span class="form__error form__error_account"></span>\
        </div>\
        <hr class="account__spliter">\
        <div class="account__wrap-row">\
          <label class="account__label" for="display_name-field">Имя в чате</label>\
          <input  value="<%=currentUserProps.display_name%>" <%=disabled%> name="display_name" id="display_name-field" class="input account__input" type="text" required minlength="2" maxlength="30">\
          <span class="form__error form__error_account"></span>\
        </div>\
        <hr class="account__spliter">\
        <div class="account__wrap-row">\
          <label class="account__label" for="phone-field">Телефон</label>\
          <input value="<%=currentUserProps.phone%>" <%=disabled%> name="phone" id="phone-field" class="input account__input" type="tel" required pattern="<%=phone_pattern%>">\
          <span class="form__error form__error_account"></span>\
        </div>\
        <div class="account__wrap-col account__wrap-col_buttons">\
          <span class="form__error form__error_server"></span>\
        </div>\
      </form>',
};
