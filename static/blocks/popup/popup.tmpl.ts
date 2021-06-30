import { Template } from "../../src/types/Template.js";

export const popup: Template = {
  tmpl:
    '<div class="popup__content">\
      <div class="form-window form-window_is-opened form-window_popup">\
        <div class="form-window__content form-window__content_popup">\
          <h3 class="form-window__title form-window__title_popup"><%=title%></h3>\
          <form class="form form__user" name="<%=name%>">\
            <div class="form__wrap">\
              <label class="form__label form__label_hidden" for="<%=name%>-name"><%=placeholder%></label>\
              <input class="input" name="<%=field%>" id="<%=name%>-name" required minlength="2" maxlength="30" type="text" placeholder="<%=placeholder%>">\
              <span class="form__error form__error_margin"></span>\
            </div>\
            <div class="form__wrap form__wrap_buttons">\
            <span class="form__error form__error_server"></span>\
            </div>\
          </form>\
        </div>  \
      </div>\
    </div>'
};


