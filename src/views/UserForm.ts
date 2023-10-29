
  /* 
  lists what elements should have what event event listeners 
  and actions for those event listeners 
  later it is used by parent class bindEvents method  */


  /* 
  used as callback for event click event listener */

  /* 
  used as callback for event click event listener */

  /* 
  used as callback for event click event listener */

  /* 
  is html string used by parent class render method later */

import { User, UserProps } from "../models/User";
import { View } from "./View";

  export class UserForm extends View<User, UserProps> {

    eventsMap(): { [key: string]: () => void } {
      return {
        'click:.set-name': this.onSetNameClick,
        'click:.set-age': this.onSetAgeClick,
        'click:.save-user': this.onSaveUserClick,
      }
    }

    onSetNameClick = ():void => {
      let input = document.querySelector('input');
      if (input) {
        let name = input.value;
        this.model.set({name});
      } 
    }

    onSetAgeClick = ():void => {
      this.model.setRandomAge();
    }

    onSaveUserClick = ():void => {
      this.model.save();
    }

    template(): string {
      return `
        <div>
          <input placeholder="${this.model.get('name')}" />
          <button class='set-name'name='nameInput'> Set Name </button>
          <button class='set-age'> Set Age </button>
          <button class='save-user'> Save User </button>
        </div>
      `
    }

}