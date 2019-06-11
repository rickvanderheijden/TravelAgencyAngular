import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';
import {TripService} from '../../services/trip.service';
import {Trip} from '../../../models/trip';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  @Input()
  bookings: Booking[];

  selectedBooking: Booking;
  trip: Trip;

  constructor(private tripService: TripService) {
    this.selectedBooking = null;
  }

  ngOnInit() {
  }

  showBookingInfo(booking: Booking) {
    if (this.selectedBooking !== null) {
      if (this.selectedBooking.id !== booking.id) {
        this.tripService.getById(booking.tripId).subscribe((trip: Trip) => {
          this.trip = trip;
          this.selectedBooking = booking;
        });
      }
    } else {
      this.tripService.getById(booking.tripId).subscribe((trip: Trip) => {
        this.trip = trip;
        this.selectedBooking = booking;
      });
    }
  }
}
