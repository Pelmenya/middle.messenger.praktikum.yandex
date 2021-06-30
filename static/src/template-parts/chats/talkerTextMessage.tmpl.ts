import { Template } from "../../types/Template";

export const talkerTextMessage: Template = {
  tmpl:
    '<p class="messages-list__text messages-list__text-msg">\
	<span class="messages-list__text-block"><%=message%></span>\
	<time class="messages-list__time-msg messages-list__time-msg_text" datetime="<%=time%>"><%=time%></time>\
    </p>',
};
