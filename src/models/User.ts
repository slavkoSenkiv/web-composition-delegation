import { Attributes } from "./Attributes";

interface UserProps {
  id? : number;
  name? : string;
  age? : number;
}

export class User {

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes(attrs);
  }

  get get() {
    return this.attributes.get;
  }
}