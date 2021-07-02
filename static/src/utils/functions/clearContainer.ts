export default function clearContainer(container: HTMLElement) {
  if (container !== null) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}
