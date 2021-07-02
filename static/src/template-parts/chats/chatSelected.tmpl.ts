import { Template } from "../../types/Template";

export const chatSelected: Template = {
  tmpl:
    '<section class="messages-list">\
        <header class="messages-list__header">\
          <div class="messages-list__wrap-row messages-list__align-center">\
            <div class="messages-list__avatar"></div>\
            <p class="messages-list__name"><%=title%></p>\
          </div> \
          <button class="messages-list__settings" type="button">\
            <span class="messages-list__settings-icon"></span> \
          </button>\
          <div class="form-window form-window__absolute form-window_messages-list-header">\
            <div class="form-window__content form-window__content_menu form-window__content_menu_user">\
              <div class="menu">\
                <button class="menu__button menu__button_add-user">\
                  <span class="menu__button-icon menu__button-icon_plus"></span>\
                  <span class="menu__button-text">Добавить пользователя</span>\
                </button>\
                <button class="menu__button menu__button_remove-user">\
                  <span class="menu__button-icon menu__button-icon_cross"></span>\
                  <span class="menu__button-text">Удалить пользователя</span>\
                </button>\
              </div>\
            </div>\
          </div>\
        </header>\
        <hr class="messages-list__spliter">\
        <h2 class="messages-list__title" hidden>Чат</h2>\
        <div class="messages-list__container"></div>\
        <hr class="messages-list__spliter">\
        <div class = "messages-list__control messages-list__wrap-row">\
          <form class="messages-list__form-send">\
            <button class="messages-list__button messages-list__add-resource" type="button"></button>\
            <div class="form-window form-window__absolute form-window_messages-list-send">\
              <div class="form-window__content form-window__content_menu">\
                <div class="menu">\
                  <button class="menu__button">\
                    <span class="menu__button-icon menu__button-icon_photo"></span>\
                    <span class="menu__button-text">Фото или Видео</span>\
                  </button>\
                  <button class="menu__button">\
                    <span class="menu__button-icon menu__button-icon_file"></span>\
                    <span class="menu__button-text">Файл</span>\
                  </button>\
                  <button class="menu__button">\
                    <span class="menu__button-icon menu__button-icon_location"></span>\
                    <span class="menu__button-text">Локация</span>\
                  </button>\
                </div>\
              </div>\
            </div>\
            <input class="input messages-list__send-input" name="message" type="text" placeholder="Сообщение" required minlength="2">\
            <button class="messages-list__button messages-list__send"></button>\
          </form>\
        </div>\
      </section>',
};
