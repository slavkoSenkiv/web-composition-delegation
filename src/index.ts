import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const root = document.getElementById('root');
if (root) {

  let user = User.buildUser({name: "Slav1", age: 29});
  console.log(user);

  let userEdit = new UserEdit(root, user);
  userEdit.render();

} else {
  throw new Error('root element not found or id is missing');
}