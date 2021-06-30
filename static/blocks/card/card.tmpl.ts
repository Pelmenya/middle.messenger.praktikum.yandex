import { Template } from "../../src/types/Template.js";

export const card: Template = {
  tmpl:
    '<div class="card__wrap-row card__person">\
        <div class="card__wrap-row">\
          <img class="card__avatar" src="./images/Ellipse.jpg" alt="Аватар чата">\
          <div class="card__message">\
            <p class="card__name"><%=title%></p>\
            <p class="card__text"><%=last_message%></p>\
          </div>\
        </div>\
        <div class="card__wrap-col card__info">\
          <div class=card__trash></div>\
          <div class="card__number-message"><span class="card__number-message-text"><%=unread_count%></span></div>\
          <time class="card__time" datetime="00:24:45">24:45</time>\
        </div>\
      </div>\
    <hr class="chats-list__spliter">',
};
