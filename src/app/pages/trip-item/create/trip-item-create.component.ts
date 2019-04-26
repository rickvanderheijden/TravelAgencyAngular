import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TripItemService} from '../../../services/trip-item.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';

@Component({
  selector: 'app-trip-item-create',
  templateUrl: './trip-item-create.component.html',
  styleUrls: ['./trip-item-create.component.scss']
})
export class TripItemCreateComponent implements OnInit {

  tripItemCreateForm: FormGroup;
  loading = false;
  tripItem: TripItem;
  constructor(private tripItemService: TripItemService, private router: Router) {
    this.tripItem = new TripItem();
    this.setForm();
  }

  ngOnInit() {
  }

  setForm() {
    this.tripItemCreateForm = new FormGroup({
      name: new FormControl(this.tripItem.name, [Validators.required]),
      description: new FormControl(this.tripItem.description, [ Validators.required]),
      imageUrl: new FormControl(this.tripItem.imageUrl, [ Validators.required]),
      price: new FormControl(this.tripItem.price, [ Validators.required]),
      tripItemType: new FormControl(this.tripItem.tripItemType, [Validators.required]),
      date: new FormControl(this.tripItem.date, [Validators.required]),
      address: new FormControl(this.tripItem.address.address, [Validators.required]),
      zipcode: new FormControl(this.tripItem.address.zipcode, [Validators.required]),
      city: new FormControl(this.tripItem.address.city.name, [Validators.required]),
      country: new FormControl(this.tripItem.address.country.name, [Validators.required]),
    });
  }

  CreateTripItem() {

  }

  back() {
    this.router.navigate(['/trip-item']);
  }

  submitForm(tripItemCreateForm: FormGroup) {
    
  }
}
