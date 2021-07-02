import { expect } from "chai";
import Button from "../../../blocks/button/Button";

const { JSDOM } = require("jsdom");

const { window } = new JSDOM(
  ` <html>
    <body>
      <div class="app"></div>
    </body>
    </html>`,
  {
    url: "http://localhost:8080",
  }
);

global.window = window;
global.document = window.document;

const btnTest = new Button({
  tagNameBlock: "div",
  name: "submit_btn",
  text: "Добавить",
  classList: "button",
});

function render(query: any, block: any) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

render(".app", btnTest);

describe("Проверяем, что добавлена в дерево добавлена кнопка =>", () => {
  it("Кнопка добавлена", () => {
    const btnTestInDocument: any = document.querySelector("button");
    expect(btnTestInDocument).not.eq(null);
  });
});

describe("Проверяем, что добавлена в дерево добавлена кнопка =>", () => {
  it("Кнопка добавлена", () => {
    const btnTestInDocument: any = document.querySelector("button");
    expect(btnTestInDocument.name).equal("submit_btn");
  });
});

describe("Проверяем textContent кнопки =>", () => {
  it("TextContent кнопки `Добавить`", () => {
    expect(btnTest.props).deep.equal({
      tagNameBlock: "div",
      name: "submit_btn",
      text: "Добавить",
      classList: "button",
    });
  });
});

describe("Проверяем, что при вызове setProps изменятся props и кнопка пререрисовалась =>", () => {
  it("Props изменились, кнопка перерисовалась с новыми данными", () => {
    btnTest.setProps({
      tagNameBlock: "div",
      name: "click_btn",
      text: "Удалить",
      classList: "button",
    });
   
    const btnTestInDocument: any = document.querySelector("button");
    expect(btnTestInDocument.name).equal("click_btn");
    
    expect(btnTest.props).deep.equal({
	tagNameBlock: "div",
	name: "click_btn",
	text: "Удалить",
	classList: "button",
      });
  });
});
