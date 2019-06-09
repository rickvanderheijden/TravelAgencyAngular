import {Component, OnInit, TemplateRef} from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {DestinationService} from '../../../services/destination.service';
import {Destination} from '../../../../models/destination';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.scss']
})
export class TripUpdateComponent implements OnInit {
  tripUpdateForm: FormGroup;
  trip: Trip;
  tripId: any;
  loading = false;
  dbTripItems: Array<TripItem>;
  dbDestination: Array<Destination>;
  selectedTripItems: Array<any>;

  constructor(
    private tripService: TripService,
    private tripItemService: TripItemService,
    private destinationService: DestinationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loading = true;
    // this.tripItemService.getTripItems().subscribe((tripItems: any) => {
    //   this.dbTripItems = tripItems;
    //   this.tripService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
    //     this.trip = new Trip(data);
    //     this.tripId = this.route.snapshot.params.id;
    //     this.setForm();
    //     this.loading = false;
    //   });
    // });
    this.destinationService.getDestinations().subscribe((destinations: any) => {
      this.dbDestination = destinations;
      this.tripService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.trip = new Trip(data);
        this.tripId = this.route.snapshot.params.id;
        this.setForm();
        this.loading = false;
      });
    });
  }

  updateTrip() {
    this.trip = new Trip(this.tripUpdateForm.value);
    this.trip.id =  this.route.snapshot.params.id;
    if (this.tripUpdateForm.valid) {
      this.tripService.updateTrip(this.trip).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/trip/']);
  }

  setForm() {
    this.tripUpdateForm = this.formBuilder.group(({
      name: this.formBuilder.control(this.trip.name, [Validators.minLength(4), Validators.required]),
      description: this.formBuilder.control(this.trip.description),
      summary: this.formBuilder.control(this.trip.summary),
      imageUrl: this.formBuilder.control(this.trip.imageUrl, [Validators.minLength(6), Validators.email, Validators.required]),
      totalPrice: this.formBuilder.control(this.trip.totalPrice, [Validators.minLength(5)]),
      discount: this.formBuilder.control(this.trip.discount),
      destinations: this.formBuilder.array([this.dbDestination])
    }));
  }

  // get destinations() {
  //   return this.formBuilder.group({
  //     destinationName: null,
  //     tripItems: this.formBuilder.control([this.tripItems])
  //   });
  // }
  //
  // get tripItems() {
  //   return this.formBuilder.group({
  //     tripItemName: null
  //   });
  // }
  //
  // addDestination() {
  //   (this.tripUpdateForm.get('destinations') as FormArray).push(this.tripItems);
  // }

}
