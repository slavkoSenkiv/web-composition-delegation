import { View } from "./View";
import { User } from "../models/User";

export class UserShow extends View<User> {

  template(): string {
    return `
      <div>
        <h1> User Form </h1>
        <p> user name: ${this.model.get('name')} </br>
        user age: ${this.model.get('age')} </p>
      </div>
    `
  }

}