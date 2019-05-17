import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Travelgroup} from '../../models/travelgroup';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TravelgroupService {

  constructor(private http: HttpClient) { }

  getTravelgroups(): Observable<Array<Travelgroup>> {
    return this.http.get(environment.server + '/users/travelGroups').pipe(
      map((response: Array<any>) => {
        const travelgroups: Array<Travelgroup> = [];
        response.forEach(function (travelgroup, index) {
          travelgroups.push(new Travelgroup(travelgroup));
        });
        return travelgroups;
    }),
    catchError(err => {
      swal('getTravelgroups', 'Er is iets niet goed gegaan.', 'error');
      throw new Error(err);
    }));
  }
}
