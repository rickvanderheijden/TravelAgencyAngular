import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  async getAsyncToken() {
    console.log('tokengetter called');
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token);
    return token;
  }
}
