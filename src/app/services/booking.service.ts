import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  /**
   * Get Booking by ID
   * @param id
   */
  getById(id): Observable<Booking> {
    return this.http.get(environment.server + '/bookings/' + id).pipe(
      map(response => {
        return new Booking(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Create a booking
   * @param booking
   */
  createBooking(booking: Booking) {
    return this.http.post(environment.server + '/bookings/createBooking', booking).pipe(
      map(response => {
        return new Booking(response);
      }),
      catchError(error => {
        swal('createBooking', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Update a trip
   * @param trip
   */
  updateBooking(booking: Booking) {
    return this.http.put(environment.server + '/bookings/updateBooking', booking).pipe(
      map(response => {
        return new Booking(response);
      }),
      catchError(error => {
        swal('updateBooking', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Delete a trip
   * @param id
   */
  deleteBooking(id: any) {
    this.http.delete(environment.url + '/bookings/' + id ).pipe(
      map( (response: any) => {
        // console.log(response);
      })
    );
  }
}
