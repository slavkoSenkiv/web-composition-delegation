import { Model, HasId } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {

  
  constructor (
    public parent: Element, 
    public model: T
  ) {
    this.bindModel();
  };

  abstract eventsMap(): { [key: string]: ()=> void }; 
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    let eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      let [ eventName, selector ] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
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