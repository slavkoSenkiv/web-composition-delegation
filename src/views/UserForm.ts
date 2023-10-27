
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

import { User } from "../models/User";
import { View } from "./View";

  export class UserForm extends View<User> {

    eventsMap(): { [key: string]: () => void } {
      return {
        'click:.set-name': this.onSetNameClick,
        'click:.set-age': this.onSetAgeClick,
        'click:.save-user': this.onSaveUserClick,
      }
    }

    onSetNameClick():void {
      console.log('set NAME button was clicked');
    }
    onSetAgeClick():void {
      console.log('set AGE button was clicked');
    }
    onSaveUserClick():void {
      console.log('set SAVE USER button was clicked');
    }

    template(): string {
      return `
        <div>
          <h1> User Form </h1>
          <p>
            user name: ${this.model.get('name')}
            </br>
            user age: ${this.model.get('age')}
          </p>
          <input />
          <button class='set-name'> Set Name </button>
          <button class='set-age'> Set Age </button>
          <button class='save-user'> Save User </button>
        </div>
      `
    }

}