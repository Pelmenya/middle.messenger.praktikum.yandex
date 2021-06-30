import { EVENTS } from "../../const/events";

export default class EventBus {
  listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: EVENTS, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  public off(event: EVENTS, callback: Function) {
    if (this.listeners[event])
      this.listeners[event].splice(this.listeners[event].findIndex((item) => item === callback), 1);
    else throw Error(`Нет события: ${event}`);
  }

  public emit(event: EVENTS, ...args: any) {
    if (this.listeners[event]) this.listeners[event].forEach((callback) => callback(...args));
    else throw Error(`Нет события: ${event}`);
  }
}
