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
    this.geographyService.getAllCountries().subscribe((countries: Array<any>) => {
      countries.forEach((country, index) => {
        if (country.cities.length) {
          this.countries.push({name: country.name});
        }
      });
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
      name: this.formBuilder.control(this.tripItem.address.city.name,  [Validators.required])
    }, );
    this.addressForm = this.formBuilder.group({
      addressLine: this.formBuilder.control(this.tripItem.address.addressLine, [Validators.required]),
      zipCode: this.formBuilder.control(this.tripItem.address.zipCode, [Validators.required]),
      city: this.cityForm,
      country: this.countryForm
    });
    this.tripItemUpdateForm = this.formBuilder.group({
      name: this.formBuilder.control(this.tripItem.name, [Validators.required]),
      description: this.formBuilder.control(this.tripItem.description, [ Validators.required]),
      imageBlob: this.formBuilder.control(this.tripItem.imageBlob, [ Validators.required]),
      price: this.formBuilder.control(this.tripItem.price, [ Validators.required]),
      minPersons: this.formBuilder.control(this.tripItem.minPersons, [ Validators.required]),
      maxPersons: this.formBuilder.control(this.tripItem.maxPersons, [ Validators.required]),
      tripItemType: this.formBuilder.control(this.tripItem.tripItemType, [Validators.required]),
      date: this.formBuilder.control(this.tripItem.date, [Validators.required]),
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
    console.log(this.tripItem);
    if (this.tripItemUpdateForm.valid) {
      console.log('stap2');
      this.tripItemService.updateTripItem(this.tripItem).subscribe(
        (response: any) => {
          this.back();
        }
      )
    }
  }

  updateImageBlob(event: String | ArrayBuffer) {
    this.tripItem.imageBlob =  event.toString();
  }

  getCities(event) {
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
}
