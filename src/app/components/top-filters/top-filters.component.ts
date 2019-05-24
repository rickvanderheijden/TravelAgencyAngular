import { Component, OnInit } from '@angular/core';
import {Country} from '../../../models/country';
import {User} from '../../../models/user';

@Component({
  selector: 'app-top-filters',
  templateUrl: './top-filters.component.html',
  styleUrls: ['./top-filters.component.scss']
})
export class TopFiltersComponent implements OnInit {

  continents: Array<any>;
  countries: Array<Country>;
  country: Country;
  continent: any;
  till: any;
  from: any;

  constructor( ) {
    this.continents = [];
    this.continents.push({name: 'Azie'}, {name: 'Oceanie'}, {name: 'Afrika'}, {name: 'Europa'}, {name: 'Noord-Amerika'}, {name: 'Zuid-Amerika'} );
  }

  ngOnInit() {
  }


  getCountries(continent) {
    // TODO: request countries by selected continent
    this.countries = new Array<Country>();
    this.countries.push(new Country({name: 'Nederland', continent: 'europa', cities:  ['Rotterdam', 'Amsterdam']}));
    this.countries.push(new Country({name: 'Belgine', continent: 'europa', cities:  ['Brussel', 'Antwerpen']}));
  }


  clearAll() {
    this.countries = [];
    this.country = null;
    this.continent = null;
  }

  checkIfNotAdmin() {
    if (!sessionStorage.getItem('currentUser')) {
      return true;
    } else {
      const user = new User(JSON.parse(sessionStorage.getItem('currentUser')));
      if (user.isAdmin()) {
        return false;
      } else {
        return true;
      }
    }
  }

  doFilter() {
  }

}
