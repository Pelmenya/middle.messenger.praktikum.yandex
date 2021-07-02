import { Template } from "../../types/Template";

export const myTextMessage: Template = {
  tmpl:
    '<p class="messages-list__text messages-list__text-msg messages-list__text-msg_you">\
       	<span class="messages-list__text-block"><%=message%></span>\
	<time class="messages-list__time-msg messages-list__time-msg_you" datetime="<%=time%>">\
	<span class="messages-list__time-msg-check"></span><%=time%>\
	</time>\
     </p>',
};
