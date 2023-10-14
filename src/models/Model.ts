import axios, { AxiosPromise, AxiosResponse } from 'axios';


interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Events {
  on(eventName: string, callback: () => {}): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

interface Sync<T> {
  rootUrl: string; //discremencies
  fetch (id: number): AxiosPromise;
  save (data: T): AxiosPromise;
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

  fetch (): void {
    let id = this.get('id'); // discrepencies
    if (typeof(id) != 'number') {
      throw new Error ('can not fetch without an ID');
    }
    this.sync.fetch(id)
      .then ((response: AxiosResponse) => {
        this.set(response.data);
      });
  }

  save (): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error')
      });
  }
}