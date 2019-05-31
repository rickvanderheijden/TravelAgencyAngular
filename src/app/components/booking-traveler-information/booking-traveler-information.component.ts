import { Component, OnInit } from '@angular/core';
import {City} from '../../../models/city';
import {GeographyService} from '../../services/geography.service';
import {Country} from '../../../models/country';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-booking-traveler-information',
  templateUrl: './booking-traveler-information.component.html',
  styleUrls: ['./booking-traveler-information.component.scss']
})
export class BookingTravelerInformationComponent implements OnInit {
  bookingTravelerInformationForm: FormGroup;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  loaded = false;
  loading = false;
  countries: Country[];
  private cities: City[];
  currentUser: User;

  constructor(private geographyService: GeographyService, private userSev: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentUser = new User(JSON.parse(sessionStorage.getItem('currentUser')));

    this.countries = new Array<Country>();
    this.geographyService.getAllCountries().subscribe((countries: Array<Country >) => {
      countries.forEach((country) => {
        if (country.cities.length) {
          this.countries.push(new Country(country));
        }
      });

      this.setForm();

      this.loaded = true;
    });
  }

  getCities(event: any) {
    this.cities = new Array();
    if (event !== undefined) {
      this.geographyService.getCitiesByCountryName(event.name).subscribe((cities: Array<City>) => {
        this.cities = cities;
        this.cityForm.get('name').enable();
      });
    }
  }

  clearCountryAndCity() {
    this.cities = null;
    const city = this.cityName;
    city.disable();
    city.setValue(null);
    this.countryForm.get('name').setValue(null);
  }

  get cityName() {
    return this.cityForm.get('name');
  }

  enterBookingTravelerInformation() {
    //TODO
  }

  private setForm() {
    this.countryForm = this.formBuilder.group({
      name: this.formBuilder.control(this.currentUser.address.country.name, [Validators.required])
    });

    this.cityForm = this.formBuilder.group({
      name: this.formBuilder.control(this.currentUser.address.city.name, [Validators.required])
    }, );

    this.cityForm.get('name').disable();

    console.log("ddr");
    this.addressForm = this.formBuilder.group({
      addressLine: this.formBuilder.control(this.currentUser.address.addressLine, [Validators.required]),
      zipCode: this.formBuilder.control(this.currentUser.address.zipCode, [Validators.required]),
      city: this.cityForm,
      country: this.countryForm
    });

    this.bookingTravelerInformationForm = this.formBuilder.group({
      firstName: this.formBuilder.control(this.currentUser.firstName, [ Validators.required] ),
      lastName: this.formBuilder.control(this.currentUser.lastName, [ Validators.required] ),
      address: this.addressForm,
    });
  }
}
