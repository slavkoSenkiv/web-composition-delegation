import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";

interface UserProps {
  id? : number;
  name? : string;
  age? : number;
}

export class User {

  private attributes: Attributes<UserProps>;
  private events: Eventing = new Eventing();

  constructor(attrs: UserProps) {
    this.attributes = new Attributes(attrs);
  }

  get get() {
    return this.attributes.get;
  }

  set (update: UserProps): void{
    this.attributes.set(update);
    //this.eventing.trigger('change');
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }




}