import { RendersBlocks } from "../../types/RendersBlocks";


export default function render(rendersBloks: RendersBlocks) {
  rendersBloks.forEach((element) => {
    const root = document.querySelector(element.query);
    if (root) root.appendChild(element.block.getContent() as HTMLElement);
  });
}
