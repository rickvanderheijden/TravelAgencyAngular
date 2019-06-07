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
  allCountries: Array<Country>;
  country: String;
  continent: String;
  trips: Array<Trip>;
  allTrips: Array<Trip>;
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
    this.country = null;
    this.continent = null;
    
    this.geoService.getAllContinents().subscribe((continents: any) => {
      this.continents = continents;
    })

    this.geoService.getAllCountries().subscribe((countries: any) => {
      this.countries = countries;
      this.allCountries = countries;
    });

    this.tripService.getTrips().subscribe((trips: any) => {
      this.foundTrips.emit(trips);
      this.trips = trips;
      this.allTrips = trips;
    })
  }

  ngOnInit() {
  }


  getCountries(continent) {
    this.continent = continent;
    this.searchDTO.continent = continent;
    if (this.country != null) {
      this.searchDTO.country = this.country;
    } else {
      this.searchDTO.country = null;
    }

    if (this.continent !== null) {
      this.tripService.searchTrips(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      })
    } else if (this.country !== null) {
      this.countries = this.allCountries;
      this.tripService.searchTrips(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    } else {
      this.countries = this.allCountries;
      this.trips = this.allTrips;
      this.foundTrips.emit(this.allTrips);
    }

    if (continent !== null) {
      this.geoService.getCountriesByContinentName(continent).subscribe((countries: any) => {
        this.countries = countries;
      });
    }
  }

  getTrips(country) {
    this.country = country;
    this.searchDTO.country = country;

    if (this.country != null) {
      this.tripService.searchTrips(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    } else {
      this.trips = this.allTrips;
      this.foundTrips.emit(this.allTrips);
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      if (event.target.value) {
        this.tripService.searchTripsByName(event.target.value).subscribe((trips: any) => {
          this.trips = trips;
          this.foundTrips.emit(trips);
        })
      } else {
        this.trips = this.allTrips;
        this.foundTrips.emit(this.allTrips);
      }
    }
  }

  doFilter() {
  }

}
