export class User {
  constructor (public name: string) {}

  sayHi (){
    console.log(`Hello, ${this.name}!`);
  }
}