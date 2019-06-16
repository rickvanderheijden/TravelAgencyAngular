import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TravelGroup} from '../../models/travelGroup';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {User} from '../../models/user';

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
  getTravelgroups(id): Observable<Array<TravelGroup>> {
    return this.http.get(environment.server + '/users/travelGroups/' + id).pipe(
      map((response: Array<any>) => {
        const travelgroups: Array<TravelGroup> = [];
        response.forEach(function (travelgroup, index) {
          travelgroups.push(new TravelGroup(travelgroup));
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
  createTravelGroup(group: TravelGroup) {
    return this.http.post(environment.server + '/travelgroups/createTravelGroup', group).pipe(
      map(response => {
        return new TravelGroup(response);
      }),
      catchError(error => {
        swal('createTravelGroup', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Update a group
   * @param group
   */
  updateTravelGroup(group: TravelGroup) {
    return this.http.put(environment.server + '/travelgroups/updateTravelGroup', group).pipe(
      map(response => {
        return new TravelGroup(response);
      }),
      catchError(error => {
        swal('updateTravelGroup', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  addUser(group: TravelGroup, id) {
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
