import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { AxiosResponse } from 'axios';

interface UserProps {
  id? : number;
  name? : string;
  age? : number;
}

const rootUrl = 'https://localhost:3000/users'

export class User {

  private attributes: Attributes<UserProps>;
  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  constructor(attrs: UserProps) {
    this.attributes = new Attributes(attrs);
  }

  get get() {
    return this.attributes.get;
  }

  set (update: UserProps): void{
    this.attributes.set(update);
    this.events.trigger('change');
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    let id = this.attributes.get('id');
    if (typeof(id) != 'number') {
      throw new Error ('cannot fatch without id');
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(()=>{
        this.trigger('error');
      });
  }

}