import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Destination} from '../../../models/destination';
import {TripItem} from '../../../models/TripItem';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  @Input()
  destination: Destination;

  selectableTripItems: TripItem[];

  @Output()
  tripItemOut = new EventEmitter<TripItem>();

  constructor() { }

  ngOnInit() {
    this.selectableTripItems = Object.assign([], this.destination.tripItems);
  }

  addTripItem(tripItem: TripItem) {
    if (this.isTripItemPresent(tripItem)) {
      let index = -1;
      this.selectableTripItems.forEach(function(selectableTripItem, selectableTripItemIndex) {
        if (selectableTripItem.id === tripItem.id) {
          index = selectableTripItemIndex;
        }
      });

      if (index !== -1) {
        this.selectableTripItems.splice(index, 1);
        this.tripItemOut.emit(tripItem);
      }
    }
  }

  removeTripItem(tripItem: TripItem) {
    if (this.destination.tripItems.indexOf(tripItem) !== -1) {
      if (this.selectableTripItems.indexOf(tripItem) === -1) {
        this.selectableTripItems.push(tripItem);
      }
    }
  }

  isTripItemPresent(tripItem: TripItem): boolean {
    let isPresent = false;
    this.destination.tripItems.forEach(function(destinationTripItem) {
      if (destinationTripItem.id === tripItem.id) {
        isPresent = true;
      }
    });

    return isPresent;
  }
}
