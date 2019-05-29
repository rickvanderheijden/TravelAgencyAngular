import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {Hotel} from '../../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  updateHotel(hotel: Hotel) {
    return this.http.put(environment.server + '/hotels/' + hotel.id, hotel).pipe(
      map(response => {
        return new Hotel(response);
      }),
      catchError(error => {
        swal('updateHotel', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  createHotel(hotel: Hotel) {
    return this.http.post(environment.server + '/hotels', hotel).pipe(
      map(response => {
        return new Hotel(response);
      }),
      catchError(error => {
        swal('createTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getById(id: any): Observable<Hotel> {
    return this.http.get(environment.server + '/hotels/' + id).pipe(
      map(response => {
        return new Hotel(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getHotels(): Observable<Array<Hotel>> {
    return this.http.get(environment.server + '/hotels').pipe(
      map((response: Array<any>) => {
        const hotels: Array<Hotel> = [];
        response.forEach(function (hotel, index) {
          hotels.push(new Hotel(hotel));
        });
        return hotels;
      }),
      catchError(err => {
        swal('getHotels', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  deleteHotel(id: number) {
    return this.http.delete(environment.url + '/hotels/' + id ).pipe(
      map( (response: any) => {
        console.log(response);
      })
    );
  }
}
