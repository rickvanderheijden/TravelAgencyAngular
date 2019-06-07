import {Component, OnInit} from '@angular/core';
import {HotelService} from '../../../services/hotel.service';
import {Hotel} from '../../../../models/hotel';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItemService} from '../../../services/trip-item.service';
import {NgOption} from '@ng-select/ng-select';
import {City} from '../../../../models/city';
import {GeographyService} from '../../../services/geography.service';

@Component({
  selector: 'app-hotel-update',
  templateUrl: './hotel-update.component.html',
  styleUrls: ['./hotel-update.component.scss']
})
export class HotelUpdateComponent implements OnInit {
  hotelUpdateForm: FormGroup;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  hotel: Hotel;
  loading = false;
  countries: NgOption[];
  private loaded = false;
  private cities: City[];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private geoService: GeographyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.countries = new Array<NgOption>();
    this.geoService.getAllCountries().subscribe((countries: Array<any>) => {
      countries.forEach((country, index) => {
        if (country.cities.length) {
          this.countries.push({name: country.name});
        }
      });
      this.hotelService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.hotel = new Hotel(data);
          this.setForm();
        this.loading = false;
      });

    });
  }

  updateHotel() {
    this.hotel = new Hotel(this.hotelUpdateForm.value);
    this.hotel.id = this.route.snapshot.params.id;
    if (this.hotelUpdateForm.valid) {
      this.hotelService.updateHotel(this.hotel).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/hotel/']);
  }

  setForm() {

  this.countryForm = this.formBuilder.group({
    name: this.formBuilder.control(this.hotel.address.country.name, [Validators.required])
  });
  this.cityForm = this.formBuilder.group({
    name: this.formBuilder.control(this.hotel.address.city.name,  [Validators.required])
  }, );
  this.addressForm = this.formBuilder.group({
    addressLine: this.formBuilder.control(this.hotel.address.addressLine, [Validators.required]),
    zipCode: this.formBuilder.control(this.hotel.address.zipCode, [Validators.required]),
    city: this.cityForm,
    country: this.countryForm
  });
  this.hotelUpdateForm = this.formBuilder.group({
    id: this.formBuilder.control({ value: this.hotel.id, disabled: true}, [ Validators.required] ),
    name: this.formBuilder.control(this.hotel.name, [ Validators.required] ),
    description: this.formBuilder.control(this.hotel.description, [ Validators.required] ),
    price: this.formBuilder.control(this.hotel.price, [ Validators.required] ),
    date: this.formBuilder.control(this.hotel.date, [ Validators.required] ),
    imageBlob: this.formBuilder.control(this.hotel.imageBlob, [ Validators.required] ),
    address: this.addressForm,
  });
    this.loaded = true;

  }

  updateImageBlob(event) {
    this.hotelUpdateForm.get('imageBlob').setValue(event)
  }

  getCities(event) {
    this.cities = new Array();
    if (event !== undefined) {
      this.geoService.getCitiesByCountryName(event.name).subscribe((cities: Array<City>) => {
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
}
