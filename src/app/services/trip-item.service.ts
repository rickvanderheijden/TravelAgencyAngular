import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TripItem} from '../../models/TripItem';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators/catchError';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TripItemService {

  constructor(private http: HttpClient) { }

  /**
   * Get All trips-Items
   */
  getTripItems(): Observable<Array<TripItem>> {
    return this.http.get(environment.server + '/tripItems/all').pipe(
      map((response: Array<any>) => {
        const tripItems: Array<TripItem> = [];
        response.forEach(function (tripItem, index) {
          tripItems.push(new TripItem(tripItem));
        });
        return tripItems;
      }),
      catchError(err => {
        swal('getTripItems', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  /**
   * Get TripItem by ID
   * @param id
   */
  getById(id): Observable<TripItem> {
    return this.http.get(environment.server + '/tripItems/' + id).pipe(
      map(response => {
        console.log(response);
        return new TripItem(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  /**
   * Delete a tripItem
   * @param id
   */
  deleteTripItem(id: any) {
    this.http.delete(environment.url + '/tripItems/' + id ).pipe(
      map( (response: any) => {
        console.log(response);
      })
    );
  }

  /**
   * Create a tripItem
   * @param id
   */
  createTripItem(tripItem: TripItem) {
    this.http.post(environment.url + '/tripItems/createTripItem', tripItem ).pipe(
      map( (response: any) => {
        console.log(response);
      })
    );
  }
}
