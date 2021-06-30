export default function clearChats() {
  const container = document.querySelector(".chats-list__container");
  if (container !== null) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}
