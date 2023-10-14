import { User } from "./models/User";

const user1 = User.buildUser({ id: 1});
user1.on('change', () => console.log(user1));
user1.fetch();

const user2 = User.buildUser({name: 'petro', age: 32});
user2.save();
