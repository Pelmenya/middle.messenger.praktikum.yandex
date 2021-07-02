import { EVENTS } from "../../const/events";
import BlockProps from "../../types/BlockProps";
import { Nullable } from "../../types/Nullable";
import { PlainObject } from "../../types/PlainObject";
import isEqual from "../functions/isEqual";
import EventBus from "./Event-Bus";

export default class Block<Props extends BlockProps> {
  private _element: Nullable<HTMLElement>;
  private eventBus: EventBus;
  props: Props;
  handler: Function | undefined;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props: Props) {
    const eventBus = new EventBus();

    this.props = this.makePropsProxy(props);

    this._element = null;

    if (this.props.handler !== undefined) this.handler = this.props.handler;

    this.eventBus = eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    if (this.handler !== undefined) eventBus.on(EVENTS.FLOW_HANDLER, this.handler.bind(this));
  }

  private createResources() {
    const { tagNameBlock, classListBlock, tabIndex } = this.props;
    this._element = this.createDocumentElement(tagNameBlock);
    if (classListBlock)
      classListBlock.forEach((item) => {
        if (this._element !== null) this._element.classList.add(item);
      });
    if (tabIndex) this._element.tabIndex = tabIndex;
  }

  private destroyResources() {
    this._componentWillUnmount();
    if (this._element !== null) {
      if(this._element.parentNode !==null)
      this._element.parentNode.removeChild(this._element);
    }
  }

  init() {
    this.createResources();
    this.eventBus.emit(EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this._render();
    this.componentDidMount({} as Props);
  }

  public componentDidMount(oldProps: Props) {
    return oldProps;
  }

  private _componentDidUpdate(oldProps: PlainObject, newProps: PlainObject) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) this._render();
  }

  public componentDidUpdate(oldProps: PlainObject, newProps: PlainObject) {
    return isEqual(oldProps, newProps);
  }

  private _componentWillUnmount() {
    this.eventBus.off(EVENTS.INIT, this.init.bind(this));
    this.eventBus.off(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.off(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.off(EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    this.eventBus.off(EVENTS.FLOW_RENDER, this._render.bind(this));
    if (this.handler !== undefined) this.eventBus.off(EVENTS.FLOW_HANDLER, this.handler.bind(this));
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block: string = this.render();
    if (this._element !== null) this._element.innerHTML = block;
  }

  public render(): string {
    return "";
  }

  public getContent() {
    return this.element;
  }

  private makePropsProxy(props: any) {
    const self = this;
    const proxyProps = new Proxy(props, {
      get(props, prop) {
        return props[prop];
      },

      set(props, prop, val) {
        const oldProps = {};
        Object.assign(oldProps, props);
        props[prop] = val;
        self.eventBus.emit(EVENTS.FLOW_CDU, oldProps, props);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });

    return proxyProps;
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show() {
    if (this._element !== null) {
      const { displayBlock } = this.props;
      displayBlock
        ? (this._element.style.display = displayBlock)
        : (this._element.style.display = "block");
    }
    if (this.handler !== undefined) this.eventBus.emit(EVENTS.FLOW_HANDLER);
  }

  public hide(destroy = false) {
    if (this._element !== null) this._element.style.display = "none";
    if (destroy) this.destroyResources();
  }
}
