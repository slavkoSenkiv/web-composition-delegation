import { HasId, Model } from "../models/Model";

export abstract class View <T extends Model<K>, K extends HasId> {

  constructor (
    public parent: Element,
    public model: T
  ) {
    this.bindModel()
  };

  abstract eventMap(): {[key: string]: ()=> void};
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', ()=>{
      this.render();
    });
  }
  
  bindEvents(fragment: DocumentFragment): void {
    let eventMap = this.eventMap();
    for (let eventKey in eventMap) {
      let [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    let templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}