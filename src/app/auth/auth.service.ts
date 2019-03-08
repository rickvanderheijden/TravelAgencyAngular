import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../models/user';
import swal from 'sweetalert2';

const TOKEN_KEY = 'access_token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = environment.server;
  user: User = null;
  authenticationState = new BehaviorSubject(false);
  loggedInUser = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService
  ) {
      this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.authenticationState.next(true);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          this.authenticationState.next(false);
        }
      }
  }

  login(credentials) {
    const url = this.url + '/auth/login';
    return this.http.post(url, credentials)
      .pipe(
        tap( res => {
          localStorage.setItem(TOKEN_KEY, res['token']);
          this.getLoggedInUser();
          this.authenticationState.next(true);
        }),
        catchError(e => {
          swal('Oops', e.message, 'error');
          throw new Error(e);
        })
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        const status = e.status;
        if (status === 401) {
          this.logout();
        }
        throw new Error(e);
      })
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }


  checkLoggedInUser() {
      return this.http.get(`${this.url}/me`).pipe(
        catchError(e => {
          const status = e.status;
          if (status === 401) {
            this.logout();
          }
          throw new Error(e);
        })
      );
  }

  loggedIn() {
    return !this.tokenExpired();
  }

  tokenExpired() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      console.log(token);
      return this.helper.isTokenExpired(token);
    }
    return false;
  };

  getLoggedInUser() {
    return this.http.get(environment.server + '/users/user').pipe(
      tap(response => {
        console.log(response);
        const user = new User(response);
        this.loggedInUser.next(user);
      }),
      catchError(error => {throw new Error(error)}))
  }
}
