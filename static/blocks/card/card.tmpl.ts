import { Template } from "../../src/types/Template.js";

export const card: Template = {
  tmpl:
    '<div class="card__wrap-row card__person">\
        <div class="card__wrap-row">\
          <div class="card__avatar"></div>\
          <div class="card__message">\
            <p class="card__name"><%=title%></p>\
            <p class="card__text"><%=last_message%></p>\
          </div>\
        </div>\
        <div class="card__wrap-col card__info">\
          <div class=card__trash></div>\
          <div class="card__number-message"><span class="card__number-message-text"><%=unread_count%></span></div>\
          <time class="card__time" datetime="<%=datetime%>"><%=date%></time>\
        </div>\
      </div>\
    <hr class="chats-list__spliter">',
};
