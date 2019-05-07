import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../../models/trip';
import {Travel} from '../../../models/travel';
import {TripItem} from '../../../models/TripItem';

@Component({
  selector: 'app-trip-description',
  templateUrl: './trip-description.component.html',
  styleUrls: ['./trip-description.component.scss'],
})
export class TripDescriptionComponent implements OnInit {

  @Input()
  trip: Trip;

  @Input()
  travel: Travel;

  @Output()
  tripItemOut = new EventEmitter<TripItem>();

  loading = false;
  constructor() {
  }

  ngOnInit() {
    this.travel = new Travel();
    this.travel.trip = this.trip;
    this.travel.totalPrice = this.trip.totalPrice;
  }

  addTripItem(tripItem: TripItem) {
    this.travel.addTripItem(tripItem);

  }

  removeTripItem(tripItem: TripItem) {
    this.travel.removeTripItem(tripItem);
    this.tripItemOut.emit(tripItem);
  }

  bookTravel() {
    // TODO
  }
}
