import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';
import {TripItem} from '../../../models/TripItem';
import {Travel} from '../../../models/travel';
import {TripDescriptionComponent} from '../trip-description/trip-description.component';
import {Destination} from '../../../models/destination';
import {DestinationComponent} from '../destination/destination.component';
import {SelectedItemCardComponent} from '../selected-item-card/selected-item-card.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @ViewChild(TripDescriptionComponent) tripDescriptionComponent;
  @ViewChild(SelectedItemCardComponent) selectedItemCardComponent;
  @ViewChildren(DestinationComponent) destinationComponents: QueryList<DestinationComponent>;

  @Input()
  tripId: number;

  travel: Travel;
  trip: Trip;
  destinations: Destination[];
  loading = false;
  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.loading = true;
    this.tripService.getById(this.tripId).subscribe(
      (response: any) => {
        this.trip = response;
        this.destinations = this.trip.destinations;
        this.travel = new Travel(this.trip);
        this.loading = false;
      });
  }

  removeTripItem(tripItem: TripItem) {
    this.destinationComponents.forEach((destinationComponent) => { destinationComponent.removeTripItem(tripItem) })
  }

  addTripItem(tripItem: TripItem) {
    // this.tripDescriptionComponent.addTripItem(tripItem);
    this.selectedItemCardComponent.addTripItem(tripItem);
  }
}
