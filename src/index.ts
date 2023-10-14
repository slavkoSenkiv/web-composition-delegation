import { User } from "./models/User";

/* const user = User.buildUser({id: 2, name: 'slav', age: 4});
user.save(); */
const user = User.buildUser({ id: 1});
user.on('change', (): void => console.log(user));
user.fetch();
