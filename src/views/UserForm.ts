
import { User } from "../models/User";

export class UserForm {

  constructor (
    private parent: Element, 
    private model: User
  ) {
    this.bindModel();
  };

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): {[key: string]: ()=>void} {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }
  
  onSetNameClick = (): void => {
    let input = this.parent.querySelector('input');
    if(input) {
      let name = input.value;
      this.model.set({name});
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input name="nameInput" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
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