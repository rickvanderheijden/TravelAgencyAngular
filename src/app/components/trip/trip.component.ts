import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';
import {TripItem} from '../../../models/TripItem';
import {Travel} from '../../../models/travel';
import {TripDescriptionComponent} from '../trip-description/trip-description.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @ViewChild(TripDescriptionComponent) tripDescriptionComponent;

  @Input()
  tripId: number;

  travel: Travel;
  trip: Trip;
  tripItems: TripItem[];
  loading = false;
  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.loading = true;
    this.tripService.getById(this.tripId).subscribe(
      (response: any) => {
        this.trip = response;
        this.tripItems = this.trip.tripItems;
        this.travel = new Travel(this.trip);
        this.loading = false;
      }
    );
  }

  addTripItem(tripItem: TripItem) {
    this.tripDescriptionComponent.addTripItem(tripItem);

    if (this.tripItems.indexOf(tripItem) !== -1) {
      this.tripItems.splice(this.tripItems.indexOf(tripItem), 1);
    }
  }

  removeTripItem(tripItem: TripItem) {
    if (this.tripItems.indexOf(tripItem) === -1) {
      this.tripItems.push(tripItem);
    }
  }
}
