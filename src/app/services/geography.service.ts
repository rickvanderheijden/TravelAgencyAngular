import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Continent} from '../../models/Continent';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators/catchError';
import {City} from '../../models/city';
import {Country} from '../../models/country';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  constructor(private http: HttpClient) { }

  getAllContinents(): Observable<Array<Continent>> {
    return this.http.get(environment.server + '/geo/getContinents').pipe(
      map((response: Array<any>) => {
        const continents: Array<Continent> = [];
        response.forEach(function (continent, index) {
          continents.push(new Continent(continent));
        });
        return continents;
      }),
      catchError(err => {
        swal('getAllContinents', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  getAllCities(): Observable<Array<City>> {
    return this.http.get(environment.server + '/geo/getCities').pipe(
      map((response: Array<any>) => {
        const cities: Array<City> = [];
        response.forEach(function (city, index) {
          cities.push(new City(city));
        });
        return cities;
      }),
      catchError(err => {
        swal('getAllCitiess', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }

  getAllCountries(): Observable<Array<Country>> {
    return this.http.get(environment.server + '/geo/getCountries').pipe(
      map((response: Array<any>) => {
        const countries: Array<Country> = [];
        response.forEach(function (country, index) {
          countries.push(new Country(country));
        });
        return countries;
      }),
      catchError(err => {
        swal('getAllCountries', 'Er is iets niet goed gegaan.', 'error');
        throw new Error(err);
      }));
  }
}
