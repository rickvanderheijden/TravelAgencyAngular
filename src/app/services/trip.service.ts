import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trip} from '../../models/trip';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  /**
   * Get All trips
   */
  getTrips(): Observable<Array<Trip>> {
    return this.http.get(environment.server + '/trips/all').pipe(
      map((response: Array<any>) => {
        const trips: Array<Trip> = [];
        response.forEach(function (trip, index) {
          trips.push(new Trip(trip));
        });
        return trips;
      }),
      catchError(err => {
        swal('Oops!!', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Get Trip by ID
   * @param id
   */
  getById(id): Observable<Trip> {
    return this.http.get(environment.server + '/trips/' + id).pipe(
      map(response => {
        console.log(response);
        return new Trip(response);
      }),
      catchError(error => {
        swal('Oops', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }
}
