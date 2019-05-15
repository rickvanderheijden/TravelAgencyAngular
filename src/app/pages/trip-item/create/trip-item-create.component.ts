import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TripItemService} from '../../../services/trip-item.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {GeographyService} from '../../../services/geography.service';
import {Continent} from '../../../../models/Continent';
import {Country} from '../../../../models/country';
import {City} from '../../../../models/city';
import {FileUploader} from 'ng2-file-upload';
import swal from 'sweetalert2';
@Component({
  selector: 'app-trip-item-create',
  templateUrl: './trip-item-create.component.html',
  styleUrls: ['./trip-item-create.component.scss']
})
export class TripItemCreateComponent implements OnInit {

  tripItemCreateForm: FormGroup;
  loading = false;
  tripItem: TripItem;
  tripItemTypes: any;
  continents: Array<Continent>;
  countries: Array<Country>;
  cities: Array<City>;
  uploader: FileUploader = new FileUploader({
    allowedFileType: ['image']
  });
  hasBaseDropZoneOver = false;
  srcUrl: any;
  constructor(private tripItemService: TripItemService, private router: Router, private geographyService: GeographyService) {
    this.tripItemTypes = [{id: 1, name: 'OUTING'}, {id: 2, name: 'PRODUCT'}, {id: 3, name: 'HOTEL'}];
    this.tripItem = new TripItem();
    this.setForm();
  }

  ngOnInit() {
    this.geographyService.getAllContinents().subscribe((continents: any) => {
        console.log(continents);
        this.continents = continents;
        this.geographyService.getAllCountries().subscribe((countries: any) => {
          this.countries = countries;
          this.geographyService.getAllCities().subscribe((cities: any) => {
            this.cities = cities;
          });
        });
    });

  }

  setForm() {
    this.tripItemCreateForm = new FormGroup({
      name: new FormControl(this.tripItem.name, [Validators.required]),
      description: new FormControl(this.tripItem.description, [ Validators.required]),
      imageUrl: new FormControl(this.tripItem.imageUrl, [ Validators.required]),
      price: new FormControl(this.tripItem.price, [ Validators.required]),
      tripItemType: new FormControl(this.tripItem.tripItemType, [Validators.required]),
      date: new FormControl(this.tripItem.date, [Validators.required]),
      address: new FormControl(this.tripItem.address.addressLine, [Validators.required]),
      zipcode: new FormControl(this.tripItem.address.zipCode, [Validators.required]),
      city: new FormControl(this.tripItem.address.city.name, [Validators.required]),
      country: new FormControl(this.tripItem.address.country.name, [Validators.required]),
    });
  }

  back() {
    this.router.navigate(['/trip-item']);
  }

  submitForm(tripItemCreateForm: FormGroup) {
    if (this.tripItemCreateForm.valid) {
      this.tripItemService.createTripItem(this.tripItem).subscribe(
        (response: any) => {
          this.router.navigate(['/trip-item']);
        }
      )
    }
  }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileDropped(file: File[]) {
    if (this.uploader.queue.length === 0) {
      swal('Fout', 'Je mag alleen foto\'s uploaden', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.returnValue) {
        this.tripItem.imageBlob = reader.result;
        this.srcUrl = reader.result;
      }
      this.uploader.clearQueue();
    };
    reader.readAsDataURL(file[0]);
  }
}
