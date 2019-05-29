import { Injectable } from '@angular/core';
import {Destination} from '../../models/destination';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  updateDestination(destination: Destination) {
    return this.http.put(environment.server + '/destinations/' + destination.id, destination).pipe(
      map(response => {
        return new Destination(response);
      }),
      catchError(error => {
        swal('updateDestination', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  createDestination(destination: Destination) {
    return this.http.post(environment.server + '/destinations', destination).pipe(
      map(response => {
        return new Destination(response);
      }),
      catchError(error => {
        swal('createTrip', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getById(id: any): Observable<Destination> {
    return this.http.get(environment.server + '/destinations/' + id).pipe(
      map(response => {
        return new Destination(response);
      }),
      catchError(error => {
        swal('getById', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(error);
      })
    );
  }

  getDestinations(): Observable<Array<Destination>> {
    return this.http.get(environment.server + '/destinations').pipe(
      map((response: Array<any>) => {
        const destinations: Array<Destination> = [];
        response.forEach(function (destination, index) {
          destinations.push(new Destination(destination));
        });
        return destinations;
      }),
      catchError(err => {
        swal('getDestinations', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  deleteDestination(id: number) {
    return this.http.delete(environment.url + '/destinations/' + id ).pipe(
      map( (response: any) => {
        console.log(response);
      })
    );
  }
}
