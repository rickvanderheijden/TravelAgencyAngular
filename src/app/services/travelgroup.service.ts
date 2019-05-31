import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Travelgroup} from '../../models/travelgroup';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {User} from '../../models/user';
import {error} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class TravelGroupService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get TravelGroups by ID
   * @param id
   */
  getTravelgroups(id): Observable<Array<Travelgroup>> {
    return this.http.get(environment.server + '/users/travelGroups/' + id).pipe(
      map((response: Array<any>) => {
        const travelgroups: Array<Travelgroup> = [];
        response.forEach(function (travelgroup, index) {
          travelgroups.push(new Travelgroup(travelgroup));
        });
        return travelgroups;
      }),
      catchError(err => {
        swal('getTravelgroups', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  getUsers(id: number): Observable<Array<User>> {
    return this.http.get(environment.server + '/travelgroups/users/' + id).pipe(
      map((response: Array<any>) => {
        const users: Array<User> = [];
        response.forEach(function (user, index) {
          users.push(new User(user));
        });
        return users;
      }),
      catchError(error => {
        swal('Oops', 'Er is iets niet goed gegaan', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Create a group
   * @param group
   */
  createTravelGroup(group: Travelgroup) {
    const httpClient = this.http;
    console.log(group)
    this.http.post(environment.server + '/travelgroups/createTravelGroup', group).pipe(
      map(response => {
        console.log(response);
      }),
      catchError(error => {
        swal('createTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
    group.users.forEach(function (user) {
      httpClient.post(environment.server + '/travelgroups/addUser/' + user.id, group).pipe(
        map(response => {
          console.log(response);
        }),
        catchError(error => {
          swal('addUsers', 'Er is iets niet goed gegaan.', 'error');
          throw new Error(error);
        })
      );
    })
  }
}
