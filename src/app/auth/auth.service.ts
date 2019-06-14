import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
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
    const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) {
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.loggedInUser.next(this.user);
          this.authenticationState.next(true);
        } else {
          sessionStorage.removeItem(TOKEN_KEY);
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
          this.setCurrentUser();
        }),
        catchError(e => {
          swal('Oops', 'Ongeldige inloggegevens', 'error');
          throw new Error(e);
        })
      );
  }

  register(user: User) {
    const url = this.url + '/auth/register';
    return this.http.post(url, user).pipe(
      map(
        (response: any) => {
          if (response) {
            return true;
          }
        }
      )
    );
  }
  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
    sessionStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (this.authenticationState.value) {
      this.getLoggedInUser();
    }
    return this.authenticationState.value;
  }

  loggedIn() {
    return !this.tokenExpired();
  }

  tokenExpired() {
    const token = sessionStorage.getItem(TOKEN_KEY);
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
        return user;
      }),
      catchError(
        error => {console.log(error.message); throw new Error(error)})
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
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  private setCurrentUser() {
    this.getLoggedInUser().subscribe(response => {
      const user = new User(response);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

}
