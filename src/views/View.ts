import { HasId, Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {

  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  abstract template(): string;
  
  onRender(): void {
  }

  eventsMap(): {[key: string]: ()=> void} {
     return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  /* 
  makes page rerender every time when 
  'change' event is triggered in the data model
  by lising render method as one of 'change' event callbacks */
  bindModel(): void {  
    this.model.on('change', () => {
      this.render();
    });
  }

  
  bindEvents(fragment: DocumentFragment): void {
    let eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      let [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element)=>{
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    let regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      let selector = regionsMap[key];
      let element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }
  
  render(): void {
    this.parent.innerHTML = '';
    let templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  }

}