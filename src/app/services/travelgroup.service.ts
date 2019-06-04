import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Travelgroup} from '../../models/travelgroup';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class TravelGroupService {

  travelGroup: Travelgroup;

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
    console.log(group);
    return this.http.post(environment.server + '/travelgroups/createTravelGroup', group).pipe(
      map(response => {
        return new Travelgroup(response);
      }),
      catchError(error => {
        swal('createTravelGroup', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  addUser(group: Travelgroup, id) {
      return this.http.post(environment.server + '/travelgroups/addUser/' + id, group).pipe(
        map(response => {
          return true;
        }),
        catchError(error => {
          swal('addUsers', 'Er is iets niet goed gegaan.', 'error');
          throw new Error(error);
        })
      );
  }
}
