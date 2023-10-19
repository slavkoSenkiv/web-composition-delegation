
import { View } from "./View";

export class UserForm extends View {

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

  
}