import { Component, OnInit } from '@angular/core';
import { HotelService} from '../../../services/hotel.service';
import {Hotel} from '../../../../models/hotel';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeographyService} from '../../../services/geography.service';
import {City} from '../../../../models/city';
import {Country} from '../../../../models/country';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.scss']
})
export class HotelCreateComponent implements OnInit {
  hotelCreateForm: FormGroup;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  hotel: Hotel;
  loading = false;
  countries: Country[];
  private loaded = false;
  private cities: City[];

  constructor(
    private hotelService: HotelService,
    private geographyService: GeographyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.countries = [];
    this.cities = [];
    this.geographyService.getAllCities().subscribe( (cities: City[]) => {
      this.cities =  cities;
      this.setForm();
    });
    this.geographyService.getAllCountries().subscribe((countries: Country[]) => {
      this.countries = countries;
    });
  }

  setForm() {
    this.hotel = new Hotel();
    this.countryForm = this.formBuilder.group({
      name: this.formBuilder.control(this.hotel.address.country.name, [Validators.required])
    });
    this.cityForm = this.formBuilder.group({
      name: this.formBuilder.control(this.hotel.address.city.name, [Validators.required])
    }, );
    this.addressForm = this.formBuilder.group({
      addressLine: this.formBuilder.control(this.hotel.address.addressLine, [Validators.required]),
      zipCode: this.formBuilder.control(this.hotel.address.zipCode, [Validators.required]),
      city: this.cityForm,
      country: this.countryForm
    });
    this.hotelCreateForm = this.formBuilder.group({
      name: this.formBuilder.control(this.hotel.name, [ Validators.required] ),
      description: this.formBuilder.control(this.hotel.description, [ Validators.required] ),
      price: this.formBuilder.control(this.hotel.price, [ Validators.required] ),
      availableFrom: this.formBuilder.control(this.hotel.availableFrom, [ Validators.required] ),
      availableTo: this.formBuilder.control(this.hotel.availableTo, [ Validators.required] ),
      imageBlob: this.formBuilder.control(this.hotel.imageBlob, [ Validators.required] ),
      address: this.addressForm,
    });
    this.loaded = true;
  }
  enterHotel() {
    this.hotel = new Hotel(this.hotelCreateForm.value);
    if (this.hotel) {
      this.hotelService.createHotel(this.hotel).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/hotel/']);
  }


  getCities(event: any) {
    this.cities = [];
    if (event !== undefined) {
      this.geographyService.getCitiesByCountryName(event.name).subscribe((cities: Array<City>) => {
        this.cities = cities;
        this.cityForm.get('name').enable();
      });
    }
  }

  updateImageBlob(event) {
    this.hotelCreateForm.get('imageBlob').setValue(event)
  }

  clearCountryAndCity() {
    this.cities = null;
    const city = this.cityName;
    city.setValue(null);
    this.countryForm.get('name').setValue(null);
  }

  get cityName() {
    return this.cityForm.get('name');
  }

  getCountry(event: City) {
    this.geographyService.getCountryByCityName(event.name).subscribe( response => {
      this.hotel.address.country = response;
      this.countryForm.get('name').setValue(response.name);
    });
  }
}
