import { Component, OnInit } from '@angular/core';
import { TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';
import {Destination} from '../../../../models/destination';
import {DestinationService} from '../../../services/destination.service';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit {
  tripCreateForm: FormGroup;
  trip: Trip;
  loading = false;
  dbTripItems: Array<TripItem>;
  dbDestinations: Array<Destination>;

  constructor(private tripService: TripService, private router: Router, private tripItemService: TripItemService, private destinationService: DestinationService, private formBuilder: FormBuilder) {
    this.trip = new Trip();
  }

  ngOnInit() {
    this.loading = true;
    // this.tripItemService.getTripItems().subscribe((tripItems: any) => {
    //   this.dbTripItems = tripItems;
    //   this.setForm();
    //   this.loading = false;
    // });
    this.destinationService.getDestinations().subscribe((destinations: any) => {
      this.dbDestinations = destinations;


      console.log(destinations);
      this.setForm();
      this.loading = false;
    });
  }

  enterTrip() {
    this.trip = new Trip(this.tripCreateForm.value);
    if (this.tripCreateForm.valid) {
      this.tripService.createTrip(this.trip).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/trip/']);
  }

  setForm() {
    this.tripCreateForm = this.formBuilder.group({
      name: this.formBuilder.control(this.trip.name, [Validators.minLength(4), Validators.required]),
      description: this.formBuilder.control(this.trip.description),
      summary: this.formBuilder.control(this.trip.summary),
      imageUrl: this.formBuilder.control(this.trip.imageUrl, [Validators.minLength(6), Validators.email, Validators.required]),
      totalPrice: this.formBuilder.control(this.trip.totalPrice, [Validators.minLength(5)]),
      discount: this.formBuilder.control(this.trip.discount),
      destinations: this.formBuilder.array([this.dbDestinations])
    });
  }

  // get destinations() {
  //   return this.formBuilder.group({
  //     destinationName: '',
  //     tripItems: this.formBuilder.array([this.tripItems])
  //   });
  // }

  // get tripItems() {
  //   return this.formBuilder.group({
  //     tripItemName: ''
  //   });
  // }

  // addDestination() {
  //   (this.tripCreateForm.get('destinations') as FormArray).push(this.tripItems);
  // }
}
