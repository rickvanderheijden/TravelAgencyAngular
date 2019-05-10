import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {Continent} from '../../../../models/Continent';
import {Country} from '../../../../models/country';
import {City} from '../../../../models/city';
import {TripItemService} from '../../../services/trip-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeographyService} from '../../../services/geography.service';
import {Trip} from '../../../../models/trip';

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
  continents: Array<Continent>;
  countries: Array<Country>;
  cities: Array<City>;
  tripItemId: any;

  constructor(
    private tripItemService: TripItemService,
    private route: ActivatedRoute,
    private router: Router,
    private geographyService: GeographyService
  ) {
    this.tripItemTypes = [{id: 1, name: 'OUTING'}, {id: 2, name: 'PRODUCT'}, {id: 3, name: 'HOTEL'}];
    this.tripItem = new TripItem();
    this.setForm();
  }

  ngOnInit() {
    this.geographyService.getAllContinents().subscribe((continents: any) => {
      this.continents = continents;
      this.geographyService.getAllCountries().subscribe((countries: any) => {
        this.countries = countries;
        this.geographyService.getAllCities().subscribe((cities: any) => {
          this.cities = cities;
        });
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
    this.tripItemUpdateForm = new FormGroup({
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

  submitForm(tripItemUpdateForm: FormGroup) {
    if (this.tripItemUpdateForm.valid) {
      this.tripItemService.updateTripItem(this.tripItem).subscribe(
        (response: any) => {
          this.router.navigate(['/trip-item']);
        }
      )
    }
  }

}
