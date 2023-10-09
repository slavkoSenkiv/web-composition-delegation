import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {

  constructor (private rootUrl: string) {};

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): void {
    let { id } = data;
    if (id) {axios.put(`${this.rootUrl}/${id}`, data)} 
    else {axios.post(`${this.rootUrl}`, data)};
  }

}