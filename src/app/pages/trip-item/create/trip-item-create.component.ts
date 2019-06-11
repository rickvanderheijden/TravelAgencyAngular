import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TripItemService} from '../../../services/trip-item.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {GeographyService} from '../../../services/geography.service';
import {Continent} from '../../../../models/Continent';
import {Country} from '../../../../models/country';
import {City} from '../../../../models/city';
import {FileUploader} from 'ng2-file-upload';
import swal from 'sweetalert2';
import {forEach} from '@angular/router/src/utils/collection';
import {NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-trip-item-create',
  templateUrl: './trip-item-create.component.html',
  styleUrls: ['./trip-item-create.component.scss']
})
export class TripItemCreateComponent implements OnInit {

  tripItemCreateForm: FormGroup;
  addressForm: FormGroup;
  cityForm: FormGroup;
  countryForm: FormGroup;
  tripItem: TripItem;
  tripItemTypes: any;
  tripItemType: number;
  countries: NgOption[];
  private cities: City[];
  loading = false;
  uploader: FileUploader = new FileUploader({
    allowedFileType: ['image']
  });
  hasBaseDropZoneOver = false;
  srcUrl: any;
  constructor(private tripItemService: TripItemService, private router: Router, private geographyService: GeographyService, private formBuilder: FormBuilder) {
    this.tripItemTypes = [{id: 1, name: 'OUTING'}, {id: 2, name: 'PRODUCT'}];
    this.tripItem = new TripItem();
  }

  ngOnInit() {
    this.countries = new Array<NgOption>();
    this.geographyService.getAllCountries().subscribe((countries: Array<any>) => {
      countries.forEach((country, index) => {
        if (country.cities.length) {
          this.countries.push({name: country.name});
        }
      });
      this.tripItem = new TripItem();
      this.countryForm = this.formBuilder.group({
        name: this.formBuilder.control(this.tripItem.address.country.name, [Validators.required])
      });
      this.cityForm = this.formBuilder.group({
        name: this.formBuilder.control(this.tripItem.address.city.name, [Validators.required])
      });
      this.cityForm.get('name').disable();
      this.addressForm = this.formBuilder.group({
        addressLine: this.formBuilder.control(this.tripItem.address.addressLine, [Validators.required]),
        zipCode: this.formBuilder.control(this.tripItem.address.zipCode, [Validators.required]),
        city: this.cityForm,
        country: this.countryForm
      });
      this.tripItemCreateForm = this.formBuilder.group({
        name: this.formBuilder.control(this.tripItem.name, [Validators.required]),
        description: this.formBuilder.control(this.tripItem.description, [ Validators.required]),
        price: this.formBuilder.control(this.tripItem.price, [ Validators.required]),
        minimumNumberOfAttendees: this.formBuilder.control(this.tripItem.minimumNumberOfAttendees, [ Validators.required]),
        maximumNumberOfAttendees: this.formBuilder.control(this.tripItem.maximumNumberOfAttendees, [ Validators.required]),
        numberOfAttendees: this.formBuilder.control(this.tripItem.numberOfAttendees, [ Validators.required]),
        tripItemType: this.formBuilder.control(this.tripItem.tripItemType, [Validators.required]),
        date: this.formBuilder.control(this.tripItem.date, [Validators.required]),
        address: this.addressForm
      });
      this.loading = true;
    });
  }

  back() {
    this.router.navigate(['/trip-item']);
  }

  submitForm() {
    this.tripItem = new TripItem(this.tripItemCreateForm.value);
    if (this.tripItem) {
      this.tripItemService.createTripItem(this.tripItem).subscribe(
        (response: any) => {
          this.router.navigate(['/trip-item']);
        }
      )
    }
  }
  updateImageBlob(event) {
    this.tripItem.imageBlob =  event.toString();
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
}
