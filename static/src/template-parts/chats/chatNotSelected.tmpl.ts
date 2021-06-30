import { Template } from "../../types/Template.js";

export const chatNotSelected: Template = {
  tmpl:
    '<section class="messages-list">\
        <h2 hidden>Отправка сообщения</h2>\
        <div class="messages-list__container messages-list__container_start">\
          <p class="messages-list__text messages-list__text_info messages-list__text_time">Выберите чат чтобы отправить сообщение</p>\
        </div>\
      </section>',
};
