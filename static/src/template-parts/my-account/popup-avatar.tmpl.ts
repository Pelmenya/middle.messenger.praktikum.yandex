import { Template } from "../../types/Template.js";

export const popupAvatar: Template = {
  tmpl:
    '<div class="popup__content">\
      <div class="form-window form-window_is-opened form-window_popup">\
        <div class="form-window__content form-window__content_popup">\
          <h3 class="form-window__title form-window__title_popup <%=error_title%>"><%=title%></h3>\
          <form class="form form__load-file" name="load_file" enctype="multipart/form-data">\
            <input class="form__input-file" type="file" name="avatar" id="photo-field" accept="image/*">\
            <div class="form__wrap form__wrap_data">\
              <label class="form__select-file <%=load%>" for="photo-field"><%=label%></label>\
            </div>\
            <div class="form__wrap form__wrap_buttons form__wrap_buttons_avatar">\
            </div>\
            <span class="form__error form__error_popup <%=error%>">Нужно выбрать файл</span>\
            </form>\
          </div>\
      </div>\
    </div>',
};
