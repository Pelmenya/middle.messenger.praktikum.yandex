import { expect } from "chai";
import { signInProps } from "../../const/objects/signInProps";
import { signUpProps } from "../../const/objects/signUpProps";
import SignInPage from "../../pages/classes/SignInPage";
import SignUpPage from "../../pages/classes/SignUpPage";
import { ROUTES } from "../../const/routes";
import Router from "./Router";

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

describe("Проверяем инициализацию роутов", () => {
  it("При вызове метода use - route добавляется в масив роутов", () => {
    const routerTest = new Router(".app");
    routerTest.use(ROUTES.SIGNIN, SignInPage, signInProps);
    routerTest.use(ROUTES.SIGNUP, SignUpPage, signUpProps);
    expect(routerTest.routes.length).to.eq(2);
  });
});

describe("Проверяем историю, при использовании метода use =>", () => {
  it("State истории не изменяется", () => {
    window.history.pushState({ page: 0, url: "/" }, "Title StartPage");
    const routerTest = new Router(".app");
    routerTest.use(ROUTES.SIGNIN, SignInPage, signInProps);
    console.log(routerTest.history.state);
    expect(routerTest.history.state).deep.equal({ page: 0, url: "/" });
  });
});

describe("Проверяем историю, при использовании метода go =>", () => {
  it("State истории изменяется", () => {
    window.history.pushState({ page: 0, url: "/" }, "Title StartPage");
    const routerTest = new Router(".app");
    routerTest.use(ROUTES.SIGNIN, SignInPage, signInProps);
    routerTest.use(ROUTES.SIGNUP, SignUpPage, signUpProps);

    routerTest.go(ROUTES.SIGNIN);
    routerTest.go(ROUTES.SIGNUP);

    expect(routerTest.history.state).deep.equal({ page: 2, url: ROUTES.SIGNUP });
  });
});

describe("Проверяем историю, при использовании метода go =>", () => {
  it("State истории изменяется", () => {
    window.history.pushState({ page: 0, url: "/" }, "Title StartPage");
    const routerTest = new Router(".app");
    routerTest.use(ROUTES.SIGNIN, SignInPage, signInProps);
    routerTest.use(ROUTES.SIGNUP, SignUpPage, signUpProps);

    routerTest.go(ROUTES.SIGNIN);
    routerTest.go(ROUTES.SIGNUP);
    routerTest.go(ROUTES.SIGNIN);

    expect(routerTest.history.state).deep.equal({ page: 3, url: ROUTES.SIGNIN });
  });
});
