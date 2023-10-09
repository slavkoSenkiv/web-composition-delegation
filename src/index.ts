import { User } from "./models/User";

const user = new User({id: 1, name: 'aang', age: 7});
console.log(user);
console.log(user.get('name'));
user.set({name: 'slav'});
console.log(user);
console.log(user.get('name'));
user.on('print', ()=>console.log(`hello ${user.get('name')}`));
console.log(user);

user.trigger('print');
user.trigger('change');
user.trigger('dummy');





