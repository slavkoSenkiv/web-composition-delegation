import { HasId, Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {

  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  /* 
  child class is required to have method with similar name, 
  and it over this method with child's method */
  abstract template(): string;
  
  /* 
  if child class has similar name method, 
  it over this method with child's method */
  onRender(): void {
  }
  
  /* 
  if child class has similar name method, 
  it over this method with child's method */
  eventsMap(): {[key: string]: ()=> void} {
     return {};
  }

  /* 
  if child class has similar name method, 
  it over this method with child's method */
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

  /* 
  grabs event listeners and their callbacks 
  from events map specified in the child class
  and attaches these events to corresponding 
  html elements  as event listeners */
  bindEvents(fragment: DocumentFragment): void {
    let eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      let [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element)=>{
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  /* 
  grabs selectors from child class regions map method
  and builds collection with the same keys 
  with properties as html elements, 
  not css class selectors*/
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
  
  /* 
  rerenders page content
  1 - clears current content if any
  2 - creates <tempate> html element
  3 - nests child class htmls string as inner content of template element
  and converts to from string to propper html
  4 - assignes event listeners and corresponding callbacks 
  from child events Map class  to corresponding HTML elements
  5 - identifies all the regions should be nested
  6 - renders each of them and drills down untill there are no nested elements
  7 - nests this <template> with all the nested stuff to parent (root div)*/
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