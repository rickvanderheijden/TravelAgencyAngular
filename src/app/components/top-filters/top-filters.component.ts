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

    this.setSearchDto();

    this.geoService.getAllContinents().subscribe((continents: any) => {
      this.continents = continents;
    });

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
    this.searchDTO.continent = this.continent;
    if (this.country != null) {
      this.searchDTO.country = this.country;
    }

    if (this.searchDTO.emptySearch()) {
      this.countries = this.allCountries;
      this.trips = this.allTrips;
      this.foundTrips.emit(this.trips);
    } else {
      this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(this.trips);
      })
    }

    if (continent !== null) {
      this.geoService.getCountriesByContinentName(continent).subscribe((countries: any) => {
        this.countries = countries;
      });
    } else {
      this.countries = this.allCountries;
    }
  }

  getTrips(country) {
    this.country = country;
    this.searchDTO.country = this.country;

    if (this.country != null) {
      this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    } else if (this.continent !== null) {
      this.getCountries(this.continent);
    } else if (this.searchDTO.keyword !== null) {
      this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    } else {
      this.trips = this.allTrips;
      this.foundTrips.emit(this.trips);
    }
  }

  getTripsFrom(from) {
    if (from) {
      this.searchDTO.from = from;
    } else {
      this.searchDTO.from = null;
    }
    if (this.searchDTO.emptySearch()) {
      this.trips = this.allTrips;
      this.foundTrips.emit(this.trips);
    } else {
      this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    }
  }

  getTripsTo(to) {
    if (to) {
      this.searchDTO.to = to;
    } else {
      this.searchDTO.to = null;
    }
    if (this.searchDTO.emptySearch()) {
      this.trips = this.allTrips;
      this.foundTrips.emit(this.trips);
    } else {
      this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
        this.trips = trips;
        this.foundTrips.emit(trips);
      });
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      if (event.target.value) {
        this.searchDTO.keyword = event.target.value;
        this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
          this.trips = trips;
          this.foundTrips.emit(trips);
        })
      } else {
        this.searchDTO.keyword = null;
        if (this.searchDTO.emptySearch()) {
          this.trips = this.allTrips;
          this.foundTrips.emit(this.trips);
        } else {
          this.tripService.searchTripsByKeywordAndCountryOrContinent(this.searchDTO).subscribe((trips: any) => {
            this.trips = trips;
            this.foundTrips.emit(trips);
          })
        }
      }
    }
  }

  setSearchDto() {
    this.searchDTO.country = null;
    this.searchDTO.continent = null;
    this.searchDTO.keyword = null;
    this.searchDTO.from = null;
    this.searchDTO.to = null;
  }

}
