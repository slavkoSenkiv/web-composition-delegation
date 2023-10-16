export class UserForm {

  constructor(private parent: Element) {};

  eventsMap(): {[key: string]: ()=> void} {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHeaderHover
    };
  }

  onHeaderHover(): void {
    console.log('H1 was hovered over');
  }
  
  onButtonClick(): void {
    console.log('hello there');
  }

  template(): string {
    return `
    <div>
      <h1>User Form</h1>
      <input />
      <button>Click Me</button>
    </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    let eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      let [ eventName, selector ] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }


  render(): void {
    let tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();
    this.bindEvents(tempateElement.content);
    this.parent.append(tempateElement.content);
  }
}