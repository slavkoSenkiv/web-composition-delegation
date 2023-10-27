
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
          <button> Set Name </button>
          <button> Set Age </button>
          <button> Save User </button>
        </div>
      `
    }

}