import { User } from "./models/User";
const user = User.buildUser({id: 1});
user.fetch();
/* console.log(user);
console.log(user.get('name'));
user.set({name: 'slav'});
console.log(user);
console.log(user.get('name'));
user.on('print', ()=>console.log(`hello ${user.get('name')}`));
console.log(user);
user.trigger('print');
user.trigger('change');
user.trigger('dummy'); */





