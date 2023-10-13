
import { Attributes } from "./Attributes";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
    constructor (
      private attributes: ModelAttributes<T>
    ) { }

  get = this.attributes.get;
}