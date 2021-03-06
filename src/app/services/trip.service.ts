import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trip} from '../../models/trip';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {SearchTripDTO} from '../../models/searchTripDTO';

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
        swal('getTrips', 'Er is iets niet goed gegaan.', 'error');
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
        return new Trip(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getFirst(): Observable<Trip> {
    return this.http.get(environment.server + '/trips/all/' + 1).pipe(
      map(response => {
        return new Trip(response);
      }),
      catchError(error => {
        swal('getFirst', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Create a trip
   * @param trip
   */
  createTrip(trip: Trip ) {
    return this.http.post(environment.server + '/trips/createTrip', trip).pipe(
      map(response => {
        return new Trip(response);
      }),
      catchError(error => {
        swal('createTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Update a trip
   * @param trip
   */
  updateTrip(trip: Trip ) {
    return this.http.put(environment.server + '/trips/updateTrip', trip).pipe(
      map(response => {
        return new Trip(response);
      }),
      catchError(error => {
        swal('updateTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Delete a trip
   * @param id
   */
  deleteTrip(id: any) {
    this.http.delete(environment.url + '/trips/' + id ).pipe(
      map( (response: any) => {
        // console.log(response);
      })
    );
  }

    /**
   * Search trips
   * @param SearchTripDTO
   */
    searchTripsByKeywordAndCountryOrContinent(searchDTO: SearchTripDTO): Observable<Array<Trip>> {
    return this.http.post(environment.url + '/trips/searchTripsByKeywordAndCountryOrContinent', searchDTO).pipe(
      map((response: Array<any>) => {
        const trips: Array<Trip> = [];
        if (response !== null) {
          response.forEach(function (trip, index) {
            trips.push(new Trip(trip));
          });
        }
        return trips;
      }),
      catchError(err => {
        swal('getTrips', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

}
