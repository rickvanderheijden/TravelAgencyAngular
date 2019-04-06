import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Get All users
   */
  getUsers() /*: Observable<Array<User>> */{
    return this.http.get(environment.server + '/users/all').pipe(
      tap(response => {
        console.log(response);
        // return new Array(new User(response));
      }),
      catchError(err => {
        swal('Oops!!', 'Er ging iets niet helemaal je van hetje', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Get User by ID
   * @param id
   */
  getById(id): Observable<User> {
    return this.http.get(environment.server + '/users/id/' + id).pipe(
      map((response: any) => {
        return new User(response);
      }),
      catchError(error => {
        swal('Oops', 'Er is iets nie goed gegaan', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Get User by username
   * @param username
   */
  getByUsername(username) {
    this.http.get(environment.server + '/user/' + username).pipe(
      tap(response => {
        console.log(response);
      }),
      catchError(error => {
        swal('Oops', 'Er is iets nie goed gegaan', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Get User by emailAddress
   * @param emailAddress
   */
  getByEmailAddress(emailAddress) {
    this.http.get(environment.server + '/user/' + emailAddress).pipe(
      tap(response => {
        console.log(response);
      }),
      catchError(error => {
        swal('Oops', 'Er is iets nie goed gegaan', 'error');
        throw new Error(error);
      })
    );
  }

  deleteUser(id: any): Observable<boolean> {
   return this.http.delete(environment.url + 'user/delete' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  updateUser(user: any, userId: any) {
  }
}
