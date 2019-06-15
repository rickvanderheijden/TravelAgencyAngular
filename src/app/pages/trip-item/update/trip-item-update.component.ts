import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {Continent} from '../../../../models/Continent';
import {Country} from '../../../../models/country';
import {City} from '../../../../models/city';
import {TripItemService} from '../../../services/trip-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeographyService} from '../../../services/geography.service';
import {Hotel} from '../../../../models/hotel';
import {NgOption} from '@ng-select/ng-select';
import swal from 'sweetalert2';

@Component({
  selector: 'app-trip-item-update',
  templateUrl: './trip-item-update.component.html',
  styleUrls: ['./trip-item-update.component.scss']
})
export class TripItemUpdateComponent implements OnInit {

  tripItemUpdateForm: FormGroup;
  loading = false;
  tripItem: TripItem;
  tripItemTypes: any;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  hotel: Hotel;
  countries: NgOption[];
  private loaded = false;
  private cities: City[];
  tripItemId: any;

  constructor(
    private tripItemService: TripItemService,
    private route: ActivatedRoute,
    private router: Router,
    private geographyService: GeographyService,
    private formBuilder: FormBuilder
  ) {
    this.tripItemTypes = [{id: 1, name: 'OUTING'}, {id: 2, name: 'PRODUCT'}];
    this.tripItem = new TripItem();
    this.setForm();
  }

  ngOnInit() {
    this.countries = new Array<NgOption>();
    this.geographyService.getAllCities().subscribe((cities: Array<City>) => {
      this.geographyService.getAllCountries().subscribe((countries: Array<Country>) => {
        this.countries = countries;
      });
      this.cities = cities;
      this.tripItemService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.tripItem = new TripItem(data);
        this.tripItemId = this.route.snapshot.params.id;
        this.setForm();
        this.loading = false;
      });
    });
  }

  setForm() {
    this.countryForm = this.formBuilder.group({
      name: this.formBuilder.control(this.tripItem.address.country.name, [Validators.required])
    });
    this.cityForm = this.formBuilder.group({
      name: this.formBuilder.control(this.tripItem.address.city.name, [Validators.required])
    });
    this.addressForm = this.formBuilder.group({
      addressLine: this.formBuilder.control(this.tripItem.address.addressLine, [Validators.required]),
      zipCode: this.formBuilder.control(this.tripItem.address.zipCode, [Validators.required]),
      city: this.cityForm,
      country: this.countryForm
    });
    this.tripItemUpdateForm = this.formBuilder.group({
      name: this.formBuilder.control(this.tripItem.name, [Validators.required]),
      description: this.formBuilder.control(this.tripItem.description, [ Validators.required]),
      price: this.formBuilder.control(this.tripItem.price, [ Validators.required]),
      imageBlob: this.formBuilder.control(this.tripItem.imageBlob, [ Validators.required]),
      minimumNumberOfAttendees: this.formBuilder.control(this.tripItem.minimumNumberOfAttendees, [ Validators.required]),
      maximumNumberOfAttendees: this.formBuilder.control(this.tripItem.maximumNumberOfAttendees, [ Validators.required]),
      tripItemType: this.formBuilder.control(this.tripItem.tripItemType, [Validators.required]),
      availableFrom: this.formBuilder.control(this.tripItem.availableFrom, [Validators.required]),
      availableTo: this.formBuilder.control(this.tripItem.availableFrom, [Validators.required]),
      address: this.addressForm
    });
    this.loaded = true;
  }

  back() {
    this.router.navigate(['/trip-item']);
  }

  submitForm() {
    this.tripItem = new TripItem(this.tripItemUpdateForm.value);
    this.tripItem.id = this.route.snapshot.params.id;
    if (this.tripItemUpdateForm.valid) {
      this.tripItemService.updateTripItem(this.tripItem).subscribe(
        (response: any) => {
          swal('Succes', 'Trip item is succesvol opgeslagen!', 'success');
          this.back();
        }
      )
    }
  }

  updateImageBlob(event: String | ArrayBuffer) {
    this.tripItem.imageBlob =  event.toString();
    this.tripItemUpdateForm.get('imageBlob').setValue(this.tripItem.imageBlob);
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
      this.tripItem.address.country = response;
      this.countryForm.get('name').setValue(response.name);
    });
  }
}
