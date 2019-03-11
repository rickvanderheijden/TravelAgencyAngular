import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trip} from '../../models/trip';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  /**
   * Get All trips
   */
  getTrips(){
    return this.http.get(environment.server + '/trips/all').pipe(
      tap(response => {
        console.log(response);
        // return new Array(new Trip(response));
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
  getById(id) {
    this.http.get(environment.server + '/trip/' + id).pipe(
      tap(response => {
        console.log(response);
      }),
      catchError(error => {
        swal('Oops', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }
}
