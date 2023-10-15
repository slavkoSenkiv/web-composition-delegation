/* import { User } from "./models/User";

const user1 = User.buildUser({ id: 1});
user1.on('change', () => console.log(user1));
user1.fetch();

const user2 = User.buildUser({name: 'petro', age: 32});
user2.save();
 */

/* import axios, { AxiosResponse } from "axios";

axios.get('http://localhost:3000/users')
  .then((response: AxiosResponse) => {
    console.log(response.data);
    
  }) */
import { User } from "./models/User"
const collection = User.buildUserCollection();
collection.on('change', () => {
  console.log(collection);
});
collection.fetch();
