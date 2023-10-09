import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {

    constructor (private rootUrl: string) {};

    fetch(id: number): AxiosPromise {
      return axios.get(`${this.rootUrl}/${id}`);
    }
}