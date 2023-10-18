import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { ApiSync } from "./ApiSynk";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model <UserProps> {

    static buildUser(attrs: UserProps): User {
      return new User(
        new Attributes<UserProps>(attrs),
        new ApiSync<UserProps>(rootUrl),
        new Eventing()
      )
    }

    static buildUserCollection():  Collection<User, UserProps> {
      return new Collection<User, UserProps> (
        rootUrl,
        (json) => this.buildUser(json)
      );
    }

    setRandomAge(): void {
      const age = Math.round(Math.random() * 100);
      this.set({age});
    }
}