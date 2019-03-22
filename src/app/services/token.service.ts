import {Injectable} from '@angular/core';

const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  async getAsyncToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
}
