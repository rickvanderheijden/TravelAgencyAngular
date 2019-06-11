import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TripItem} from '../../models/TripItem';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators/catchError';
import swal from 'sweetalert2';
import {Hotel} from '../../models/hotel';

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
        return new TripItem(response);
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
        // console.log(response);
      })
    );
  }

  /**
   * Create a tripItem
   * @param tripItem
   */
  createTripItem(tripItem: TripItem) {
    return this.http.post(environment.url + '/tripItems/createTripItem', tripItem ).pipe(
      map( (response: any) => {
        // console.log(response);
      })
    );
  }

  updateTripItem(tripItem: TripItem) {
    return this.http.put(environment.url + '/tripItems/' + tripItem.id, tripItem).pipe(
      map((response: any) => {
        console.log(response);
      })
    );

  }

  getTripItemsByCity(name: any) {
    return this.http.get(environment.server + '/tripItems/city/' + name).pipe(
      map((response: Array<any>) => {
        const tripItems: Array<TripItem> = [];
        response.forEach(function (tripItem, index) {
          tripItems.push(new TripItem(tripItem));
        });
        return tripItems;
      }),
      catchError(err => {
        swal('gettripItemsByCity', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }
}
