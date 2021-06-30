import { Template } from "../../types/Template.js";

export const myAccountAvatar: Template = {
  tmpl:
    '<div class="account__avatar" style="background-image: url(<%=avatar%>)">\
      <div class="account__avatar-overlay" style="display: <%=display%>">\
        <div class="account__wrap-row account__wrap-row_avatar">\
          <span class="account__avatar-text">Поменять аватар</span>\
        </div>\
      </div>\
    </div>',
};
