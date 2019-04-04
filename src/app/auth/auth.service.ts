import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {catchError, map, tap} from 'rxjs/operators';
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
          this.loggedInUser.next(this.user);
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
          this.storeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          swal('Oops', e.message, 'error');
          throw new Error(e);
        })
      );
  }

  register(user: User) {
    const url = this.url + '/auth/register';
    return this.http.post(url, user).pipe(
      map(
        (response: any) => {
          console.log(response);
          if (response) {
            return true;
          }
        }
      )
    );
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    if (this.authenticationState.value){
      this.getLoggedInUser();
    }
    return this.authenticationState.value;
  }

  loggedIn() {
    return !this.tokenExpired();
  }

  tokenExpired() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return this.helper.isTokenExpired(token);
    }
    return false;
  };

  getLoggedInUser() {
    return this.http.get(environment.server + '/users/user').pipe(
      tap(response => {
        const user = new User(response);
        this.loggedInUser.next(user);
      }),
      catchError(error => {throw new Error(error)})
    );
  }

  refreshToken() {
    return this.http.get(environment.server + 'auth/refresh').pipe(
      tap((token: any) => {
        this.storeToken(token.token);
      })
    )
  }



  private storeToken(token: any) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  isAdmin() {
    if (!this.isAuthenticated()) {
      return false;
    } else {
      if (this.user == null) {
        this.getLoggedInUser().subscribe(user => {
          this.user = new User(user);
          return this.user.isAdmin();
        });
      }
    }
  }
}
