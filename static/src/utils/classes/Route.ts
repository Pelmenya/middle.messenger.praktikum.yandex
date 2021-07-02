import isEqualStrings from "../functions/isEqualStrings";
import render from "../functions/render";

interface RouteProps {
  rootQuery: string;
  blockProps: any;
}

export default class Route {
  props: RouteProps;
  pathname: string;
  blockClass: any;
  block: any;

  constructor(pathname: string, view: Function, props: RouteProps) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide(true);
    }
  }

  match(pathname: string) {
    return isEqualStrings(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass(this.props.blockProps);
    }
    if (this.props.blockProps.elements !== undefined)
      render([
        { query: this.props.rootQuery, block: this.block },
        ...this.props.blockProps.elements,
      ]);
    else
      render([
        { query: this.props.rootQuery, block: this.block },
      ]);
      if (this.block !== null) this.block.show();
  }
}
