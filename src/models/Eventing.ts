type Callback = () => void;

export class Eventing {

  events: {[eventName: string]: Callback[]} = {}

  on = (eventName: string, callback: Callback) => {
    let handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
}