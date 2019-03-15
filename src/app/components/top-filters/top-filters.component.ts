import { Component, OnInit } from '@angular/core';
import {Country} from '../../../models/country';
import {AuthenticationService} from '../../auth/auth.service';

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

  constructor( private authService: AuthenticationService) {
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

  doFilter() {
    this.authService.getLoggedInUser().subscribe(response => {
      console.log(response);
    })
  }

}