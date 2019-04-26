import {Component, Input, OnChanges, OnInit} from '@angular/core';
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

  loading = false;
  constructor() {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.travel = new Travel();
    this.travel.trip = this.trip;
    console.log(this.trip);
    console.log(this.travel);
  }

  addTripItem(tripItem: TripItem) {
    this.travel.addTripItem(tripItem);
    console.log(this.travel);
  }
}
