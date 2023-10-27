import { UserForm } from "./views/UserForm"; 
import { User } from "./models/User";
import { UserShow } from "./views/UserShow";

const root = document.getElementById('root');
if (root) {

  let user = User.buildUser({name: "Slav1", age: 29});
  console.log(user);

  let userShow = new UserShow(root, user);
  console.log(userShow);
  userShow.render();
  
  let userForm = new UserForm(root, user);
  console.log(userForm);
  userForm.render();
} else {
  throw new Error('root element not found or id is missing');
}