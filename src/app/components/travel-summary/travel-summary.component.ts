import {Component, Input, OnInit} from '@angular/core';
import {Travel} from '../../../models/travel';
import {Booking} from '../../../models/booking';
import {BookableHotel} from '../../../models/bookablehotel';
import swal from 'sweetalert2';

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
      bookableTripItem.amount = this.booking.numberOfTravelers;
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
      swal({
        title: 'Weet je het zeker?',
        text: 'Weet je zeker dat je het product van de reis wil verwijderen',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ja, verwijderen!',
        cancelButtonText: 'Nee, product behouden'
      }).then((result) => {
        if (result.value) {
          this.booking.tripItems.splice(indexToRemove, 1);
        }
      });
    }
  }

  increaseTripItemAmount(tripItemId: number) {
    const numberOfTravelers = this.booking.numberOfTravelers;
    this.booking.tripItems.forEach(function(tripItem) {
      if (tripItem.id === tripItemId) {
        if (tripItem.amount < tripItem.maxPersons && tripItem.amount < numberOfTravelers) {
          tripItem.amount++;
        }
      }
    });
  }
}
