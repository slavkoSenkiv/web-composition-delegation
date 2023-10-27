
  /* 
  child class is required to have method with similar name, 
  and it over this method with child's method */


  
  /* 
  if child class has similar name method, 
  it over this method with child's method */
  
  /* 
  if child class has similar name method, 
  it over this method with child's method */

  /* 
  if child class has similar name method, 
  it over this method with child's method */

  /* 
  makes page rerender every time when 
  'change' event is triggered in the data model
  by lising render method as one of 'change' event callbacks */

  /* 
  grabs event listeners and their callbacks 
  from events map specified in the child class
  and attaches these events to corresponding 
  html elements  as event listeners */

  /* 
  grabs selectors from child class regions map method
  and builds collection with the same keys 
  with properties as html elements, 
  not css class selectors*/
  
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

import { User } from "../models/User";

export abstract class View<T extends User> {

  constructor (
    private parent: Element,
    public model: T
  ) {};

  abstract template(): string;

  eventsMap(): {[key: string]: ()=>void} {
    return {}
  }

  bindEvents(fragment: DocumentFragment): void {
    let eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      let [event, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element)=>{
        element.addEventListener(event, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    let tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();
    this.bindEvents(tempateElement.content);
    this.parent.append(tempateElement.content);
  }

}