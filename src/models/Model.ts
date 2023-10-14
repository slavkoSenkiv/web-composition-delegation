import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

interface Sync<T> {
  fetch (id: number): AxiosPromise;
  save (date: T): AxiosPromise;
}

export class Model<T extends HasId> {
    constructor (
      private attributes: ModelAttributes<T>,
      private sync: Sync<T>,
      private events: Events
    ) { }

  get = this.attributes.get;
  on = this.events.on;
  trigger = this.events.trigger;

  set (update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    let id = this.attributes.get('id');
    if (typeof(id) != 'number') throw new Error ('cannot fetch without an ID'); //discrepencies
    this.sync.fetch(id).then((response: AxiosResponse) => this.set(response.data)); //discrepencies
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse) => this.trigger('save')) //discrepencies
      .catch(() => this.trigger('error')) //discrepencies
  }


}