import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking';
import {Hotel} from '../../models/hotel';

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
    return this.http.post(environment.server + '/bookings', booking).pipe(
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
    return this.http.put(environment.server + '/bookings', booking).pipe(
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
  /**
   * get Bookings by logged in users token
   */
  getAllByToken(): Observable<Array<Booking>> {
    return this.http.get(environment.server + '/bookings/token' ).pipe(
      map((response: Array<any>) => {
        const bookings: Array<Booking> = [];
        response.forEach(function (boooking, index) {
          bookings.push(new Booking(boooking));
        });
        return bookings;
      }),
      catchError(error => {
        swal('getAllByToken', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getBookings(): Observable<Array<Booking>> {
    return this.http.get(environment.server + '/bookings').pipe(
      map((response: Array<any>) => {
        const bookings: Array<Booking> = [];
        response.forEach(function (booking, index) {
          bookings.push(new Booking(booking));
        });
        return bookings;
      }),
      catchError(err => {
        swal('getBookings', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  setPaid(id: any) {
    return this.http.get( environment.url + '/bookings/paid/' + id).pipe(
      map((response: any) => {
          return true;
      }),
      catchError(err => {
        swal('getBookings', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }
}
