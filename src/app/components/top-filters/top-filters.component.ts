import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Country} from '../../../models/country';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';
import {GeographyService} from '../../services/geography.service';
import {Continent} from '../../../models/Continent';
import {SearchTripDTO} from '../../../models/searchTripDTO';

@Component({
  selector: 'app-top-filters',
  templateUrl: './top-filters.component.html',
  styleUrls: ['./top-filters.component.scss']
})
export class TopFiltersComponent implements OnInit {

  continents: Array<Continent>;
  countries: Array<Country>;
  country: Country;
  continent: Continent;
  till: any;
  from: any;
  geoService: GeographyService;
  tripService: TripService;
  searchDTO: SearchTripDTO;

  @Output()
  foundTrips = new EventEmitter<Array<Trip>>();

  constructor( tripService: TripService, geoService: GeographyService) {
    this.searchDTO = new SearchTripDTO();
    this.geoService = geoService;
    this.tripService = tripService;

    this.clearAll();

    this.geoService.getAllContinents().subscribe((continents: any) => {
      this.continents = continents;
    })
  }

  ngOnInit() {
  }


  getCountries(continent) {
    this.searchDTO.continent = continent;
    this.searchDTO.country = null;
    this.clearAll();

    this.tripService.searchTrips(this.searchDTO).subscribe((trips: any) => {
      this.foundTrips.emit(trips);
    })

    this.geoService.getCountriesByContinentName(continent).subscribe((countries: any) => {
      this.countries = countries;
    });
  }

  getTrips(country) {
    this.searchDTO.country = country;
    this.tripService.searchTrips(this.searchDTO).subscribe((trips: any) => {
      this.foundTrips.emit(trips);
    });
  }


  clearAll() {
    this.countries = [];
    this.country = null;
    this.continent = null;
  }

  doFilter() {
  }

}
