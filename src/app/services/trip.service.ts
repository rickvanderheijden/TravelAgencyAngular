import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trip} from '../../models/trip';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

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
        console.log(response);
        return new Trip(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getFirst(): Observable<Trip> {
    console.log('getFirst');
    return this.http.get(environment.server + '/trips/all/' + 1).pipe(
      map(response => {
        console.log(response);
        return new Trip(response);
      }),
      catchError(error => {
        swal('getFirst', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Create Trip with parameters
   * @param name
   * @param description
   * @param summary
   * @param imageUrl
   * @param total_price
   * @param discount
   */
  createTrip(name: string, description: string, summary: string, imageUrl: string, total_price: number, discount: number ){
    console.log('CreateTrip')
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('description', description);
    body.set('summary', summary);
    body.set('imageUrl', imageUrl);
    body.set('total_price', total_price.toString());
    body.set('discount', discount.toString());

    return this.http.post(environment.server + '/trips/createTrip/' + 1, body).pipe(
      map(response => {
        console.log(response);
        console.log('[CreateUser] ' + JSON.stringify(response));
        return new Trip(response);
      }),
      catchError(error => {
        swal('createTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }
}
