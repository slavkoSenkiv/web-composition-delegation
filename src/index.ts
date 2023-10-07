import { User } from "./models/User";

const user = new User({id: 1, name: 'aang', age: 7});
console.log(user);
console.log(user.get('name'));
