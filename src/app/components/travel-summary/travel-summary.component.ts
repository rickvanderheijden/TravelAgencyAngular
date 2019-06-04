import {Component, Input, OnInit} from '@angular/core';
import {Travel} from '../../../models/travel';
import swal from 'sweetalert2';
import {BookingItem} from '../../../models/bookingitem';
import {Booking} from '../../../models/booking';

@Component({
  selector: 'app-travel-summary',
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.scss']
})
export class TravelSummaryComponent implements OnInit {

  @Input()
  travel: Travel;

  private booking: Booking = new Booking();
  loading = false;

  constructor() {
  }

  ngOnInit() {
    this.loading = true;
    this.booking.setPropertiesFromTravel(this.travel);

    // this.booking.bookingItems.forEach(function (bookingItem) {
    //   bookingItem.numberOfAttendees = this.booking.numberOfTravelers;

    this.loading = false;
  }

  decreaseBookItemAttendees(bookingItem: BookingItem) {
    if (typeof bookingItem === typeof undefined) { return; }

    let indexToRemove = -1;

    this.booking.bookingItems.forEach(function(foundBookingItem, index) {
      if (foundBookingItem === bookingItem) {
        if (foundBookingItem.numberOfAttendees > 1) {
          foundBookingItem.numberOfAttendees--;
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
          this.booking.bookingItems.splice(indexToRemove, 1);
        }
      });
    }
  }

  increaseBookingItemAttendees(bookingItem: BookingItem) {
    if (typeof bookingItem === typeof undefined) { return; }

    const numberOfTravelers = this.booking.numberOfTravelers;
    this.booking.bookingItems.forEach((foundBookingItem) => {
      if (foundBookingItem === bookingItem) {
        if (
          foundBookingItem.numberOfAttendees < 4 &&  // TODO: Remove hardcoded value
          foundBookingItem.numberOfAttendees < numberOfTravelers) {
          foundBookingItem.numberOfAttendees++;
        }
      }
    });
  }

  getBooking() {
    this.booking.bookingDate = new Date();
    return this.booking;
  }

  getTripItem(tripItemId: number) {
    const foundTripItem = this.travel.tripItems.find(function(tripItem) {
      return tripItem.id === tripItemId;
    });

    return foundTripItem;
  }

  getHotel(hotelId: number) {
    const foundHotel = this.travel.hotels.find(function(hotel) {
      return hotel.id === hotelId;
    });

    return foundHotel;
  }

}
