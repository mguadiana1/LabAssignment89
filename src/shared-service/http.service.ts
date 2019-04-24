import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL = '';

  constructor(
    private http: Http
  ) {
    this.apiURL = environment.apiURL;
  }
  testing() {
    console.log('from http service testing.......');
  }
  async get(path: string) {
    const resp = await this.http.get(this.apiURL + path).toPromise();
    console.log('resp from http service get() resp:', resp);
  }
  async post(path: string, payload: any) {
    const resp = await this.http.post(this.apiURL + path , payload, this.headers).toPromise();
    console.log('from http service post() resp:', resp.json());
    return resp.json();
  }
  async put(path: string, payload: any) {
    const resp = await this.http.put(this.apiURL + path, payload, this.headers).toPromise();
    console.log('from http service put()', resp.json());
    return resp.json();
  }
async delete(path: string) {
  const resp = await this.http.delete();

  }


  get headers() {
    const token = localStorage.getItem('id_token') || null;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return {
      headers,
      withCredentials: true
    };
  }
}
