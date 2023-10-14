type Callback = () => {};

export class Eventing {

  events: {[eventName: string]: Callback[]} = {};

  on = (eventName: string, callback: Callback): void => {
    let handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    let handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) { return };
    handlers.forEach(callback => callback());
  }
}