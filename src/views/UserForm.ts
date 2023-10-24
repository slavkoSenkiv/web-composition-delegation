import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

  /* 
  lists what elements should have what event event listeners 
  and actions for those event listeners 
  later it is used by parent class bindEvents method  */
  eventsMap(): { [key: string]: () => void; } {
    return {
      'click:.set-name': this.onSetNameClick,
      'click:.set-age': this.onSetAgeClick,
      'click:.save-model': this.onSaveClick
    }
  }

  /* 
  used as callback for event click event listener */
  onSetNameClick = (): void => {
    let input = document.querySelector('input');
    if (input) {
      let name = input.value;
      this.model.set({name});
    }
  }

  /* 
  used as callback for event click event listener */
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }
  
  /* 
  used as callback for event click event listener */
  onSaveClick = (): void => {
    this.model.save();
  }

  /* 
  is html string used by parent class render method later */
  template(): string {
    return `
    <div>
      <input 
        placeholder=${this.model.get('name')} 
        name="nameInput" />
      <button class="set-name">Change Name</button>
      <button class="set-age">Set Random Age</button>
      <button class="save-model">Save User</button>
    </div>
    `;
  }
}