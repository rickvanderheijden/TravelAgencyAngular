import {Component, OnInit} from '@angular/core';
import {HotelService} from '../../../services/hotel.service';
import {Hotel} from '../../../../models/hotel';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgOption} from '@ng-select/ng-select';
import {City} from '../../../../models/city';
import {GeographyService} from '../../../services/geography.service';

@Component({
  selector: 'app-booking-read',
  templateUrl: './booking-read.component.html',
  styleUrls: ['./booking-read.component.scss']
})
export class BookingReadComponent implements OnInit {
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
}
