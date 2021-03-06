import {Component, Input, OnInit} from '@angular/core';
import {Travel} from '../../../models/travel';
import swal from 'sweetalert2';
import {BookingItem} from '../../../models/bookingitem';
import {Booking} from '../../../models/booking';
import {HotelService} from '../../services/hotel.service';

@Component({
  selector: 'app-travel-summary',
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.scss']
})
export class TravelSummaryComponent implements OnInit {

  @Input()
  travel: Travel;

  booking: Booking = new Booking();
  loading = false;

  constructor(private hotelService: HotelService) {
  }

  ngOnInit() {
    this.loading = true;
    this.booking.numberOfTravelers = 2;
    this.booking.setPropertiesFromTravel(this.travel);
    this.loading = false;
  }

  decreaseBookingItemAttendees(bookingItem: BookingItem) {
    if (typeof bookingItem === typeof undefined) {
      return;
    }

    let indexToRemove = -1;

    this.booking.bookingItems.forEach(function (foundBookingItem, index) {
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
    if (typeof bookingItem === typeof undefined) {
      return;
    }

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
    const foundTripItem = this.travel.tripItems.find(function (tripItem) {
      return tripItem.id === tripItemId;
    });

    return foundTripItem;
  }

  getHotel(hotelId: number) {
    const foundHotel = this.travel.hotels.find(function (hotel) {
      return hotel.id === hotelId;
    });

    return foundHotel;
  }

  decreaseNumberOfTravelers() {
    if (this.booking.numberOfTravelers > this.travel.trip.minimumNumberOfTravelers) {
      this.booking.numberOfTravelers--;

      const self = this;
      this.booking.bookingItems.forEach(function (bookingItem) {
        if (bookingItem.bookingItemType === 'HOTEL') {
          self.decreaseBookingItemAttendees(bookingItem);
        }
      });
    }
  }

  async increaseNumberOfTravelers() {
    let availability = this.travel.trip.maximumNumberOfTravelers;
    const self = this;

    for (const hotel of this.travel.hotels) {
      await self.getHotelAvailability(hotel.id).then(hotelAvailability => {
        if (hotelAvailability < availability) {
          availability = hotelAvailability;
        }
      });
    }

    if (this.booking.numberOfTravelers < availability) {
      this.booking.numberOfTravelers++;
      this.booking.bookingItems.forEach(function (bookingItem) {
        if (bookingItem.bookingItemType === 'HOTEL') {
          self.increaseBookingItemAttendees(bookingItem);
        }
      });
    }
  }

  async getHotelAvailability(hotelId: number) {
    return await this.hotelService.getAvailability(hotelId);
  }
}
