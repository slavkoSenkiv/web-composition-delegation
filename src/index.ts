/* import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const root = document.getElementById('root');
if (root) {

  let user = User.buildUser({name: "Slav1", age: 29});
  console.log(user);

  let userEdit = new UserEdit(root, user);
  userEdit.render();

} else {
  throw new Error('root element not found or id is missing');
} */

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';

const users = new Collection('http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', ()=>{
  let root = document.getElementById('root');
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();

