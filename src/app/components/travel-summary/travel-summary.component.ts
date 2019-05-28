import {Component, Input, OnInit} from '@angular/core';
import {Travel} from '../../../models/travel';
import {Booking} from '../../../models/booking';
import {BookableHotel} from '../../../models/bookablehotel';

@Component({
  selector: 'app-travel-summary',
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.scss']
})
export class TravelSummaryComponent implements OnInit {

  @Input()
  travel: Travel;

  booking: Booking = new Booking();

  constructor() {
  }

  ngOnInit() {
    this.booking.tripItems = Object.assign([], this.travel.tripItems);
    for (const bookableTripItem of this.booking.tripItems) {
      bookableTripItem.amount = 1;
    }

    for (const hotel of this.travel.hotels) {
      const bookableHotel = new BookableHotel(hotel);
      console.log(bookableHotel);

      this.booking.hotels.push(bookableHotel);
    }
  }

  decreaseTripItemAmount(tripItemId: number) {
    let indexToRemove = -1;

    this.booking.tripItems.forEach(function(tripItem, index) {
      if (tripItem.id === tripItemId) {
        if (tripItem.amount > 1) {
          tripItem.amount--;
        } else {
          indexToRemove = index;
        }
      }
    });

    if (indexToRemove !== -1) {
      this.booking.tripItems.splice(indexToRemove, 1);
    }
  }

  increaseTripItemAmount(tripItemId: number) {
    console.log('increaseTripItemAmount: ' + tripItemId);
    console.log(this.booking.tripItems);

    this.booking.tripItems.forEach(function(tripItem) {
      if (tripItem.id === tripItemId) {
        tripItem.amount++;
      }
    });
  }
}
