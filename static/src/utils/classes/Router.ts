import { ROUTES } from "../../const/routes.js";
import { Nullable } from "../../types/Nullable.js";
import getCurrentUser from "../functions/getCurrentUser.js";
import getUrlRoute from "../functions/getUrlRoute.js";
import isDataEmptyInStore from "../functions/isDataEmptyInStore.js";
import Route from "./Route.js";

export default class Router {
  private rootQuery: string;
  private currentRoute: Nullable<Route>;
  private activePage: number;
  public routes: Route[];
  public history: History;

  constructor(rootQuery: string = ".app") {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;
    this.activePage = 0;
  }

  public use(pathname: string, block: Function, blockProps: any) {
    const route = new Route(pathname, block, { blockProps, rootQuery: this.rootQuery });
    this.routes.push(route);
    return this;
  }

  private handlerOnPopState = (event: Event) => {
    const routeUrl = getUrlRoute(window);
    getCurrentUser().then((data) => {
      if (data !== null) {
        if (event.currentTarget instanceof Window)
          if (this.history.state !== null) {
            this.onRoute(this.history.state.url);
          } else {
            this.onRoute(getUrlRoute(event.currentTarget));
          }
      } else {
        console.log(routeUrl);
        if (routeUrl === ROUTES.SIGNIN) this.onRoute(ROUTES.SIGNIN);
        else if (routeUrl === ROUTES.SIGNUP) {
          this.onRoute(ROUTES.SIGNUP);
        } else {
          this.onRoute(ROUTES.ERROR);
        }
      }
    });
  };

  public start() {
    window.onpopstate = this.handlerOnPopState;
    if (this.history.state === null) this.onRoute(getUrlRoute(window));
    else this.onRoute(this.history.state.url);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    window.onpopstate = this.handlerOnPopState;

    if (getUrlRoute(window) === ROUTES.SIGNIN) {
      if (isDataEmptyInStore("currentUser")) {
        this.activePage++;
        this.history.pushState(
          { page: this.activePage, url: pathname },
          `Title: ${this.activePage}`,
          pathname
        );
        this.onRoute(pathname);
      } else {
        this.activePage++;
        this.history.replaceState(
          { page: this.activePage, url: ROUTES.CHATS },
          `Title: ${this.activePage}`,
          ROUTES.CHATS
        );
        this.onRoute(ROUTES.CHATS);
      }
    } else {
      this.activePage++;
      this.history.pushState(
        { page: this.activePage, url: pathname },
        `Title: ${this.activePage}`,
        pathname
      );
      this.onRoute(pathname);
    }
  }

  public back() {
    window.onpopstate = this.handlerOnPopState;
    this.history.back();
  }

  public forward() {
    window.onpopstate = this.handlerOnPopState;
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router(".app");
