export default function scrollMessagesContainer(container: HTMLElement, marginBotom = 20) {
  container.scrollTo({
    top: Math.max(
      container.scrollHeight,
      document.documentElement.scrollHeight,
      container.offsetHeight,
      document.documentElement.offsetHeight,
      container.clientHeight,
      document.documentElement.clientHeight
    ) + marginBotom,
    behavior: "smooth",
  });
}
