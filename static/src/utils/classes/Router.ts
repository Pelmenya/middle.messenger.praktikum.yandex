import { ROUTES } from "../../const/routes";
import { Nullable } from "../../types/Nullable";
import getCurrentUser from "../functions/getCurrentUser";
import getUrlRoute from "../functions/getUrlRoute";
import isDataEmptyInStore from "../functions/isDataEmptyInStore";
import Route from "./Route";

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
    this.create();
  }

  public create = () => {
    window.onpopstate = this.handlerOnPopState;
  };

  public use(pathname: string, block: Function, blockProps: any) {
    const route = new Route(pathname, block, { blockProps, rootQuery: this.rootQuery });
    this.routes.push(route);
    return this;
  }

  private handlerOnPopState = (event: Event) => {
    if (event.target instanceof Window) {
      const routeUrl = getUrlRoute(event.target);
      getCurrentUser().then((data) => {
        if (data !== null) {
            if (this.history.state !== null) {
              this.onRoute(this.history.state.url);
            } else {
              this.onRoute(routeUrl);
            }
        } else {
          if (routeUrl === ROUTES.SIGNIN) this.onRoute(ROUTES.SIGNIN);
          else if (routeUrl === ROUTES.SIGNUP) {
            this.onRoute(ROUTES.SIGNUP);
          } else {
            this.onRoute(ROUTES.ERROR);
          }
        }
      });
    }
  };

  public start() {
    if (this.history.state === null) this.onRoute(getUrlRoute(window));
    else this.onRoute(this.history.state.url);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go(ROUTES.ERROR);
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    if (getUrlRoute(window) === ROUTES.SIGNIN || getUrlRoute(window) === ROUTES.SIGNUP) {
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
    this.activePage--;
    this.history.back();
  }

  public forward() {
    this.activePage++;
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
