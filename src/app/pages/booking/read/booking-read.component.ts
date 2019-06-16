import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GeographyService} from '../../../services/geography.service';
import {Booking} from '../../../../models/booking';
import {Trip} from '../../../../models/trip';
import {BookingService} from '../../../services/booking.service';
import {TripService} from '../../../services/trip.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-booking-read',
  templateUrl: './booking-read.component.html',
  styleUrls: ['./booking-read.component.scss']
})
export class BookingReadComponent implements OnInit {

  booking: Booking;
  bookingId: number;
  trip: Trip;
  loaded = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private geoService: GeographyService,
    private bookingService: BookingService,
    private tripService: TripService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.bookingId = this.route.snapshot.params.id;

    this.bookingService.getById(this.bookingId).subscribe(
      (booking: Booking) => {
        this.booking = booking;

        this.tripService.getById(this.booking.tripId).subscribe(
          (trip: Trip) => {
            this.trip = trip;
            this.loaded = true;
            this.loading = false;
          }
        )
      }
    )


  }

  back() {
    this.router.navigate(['/bookings/']);
  }

  setBookingToPaid() {
    swal({
      title: 'Weet je het zeker?',
      text: 'Weet je zeker dat de betaling is ontvangen, bij ja is de betaling voor deze trip voldaan.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, Betaling is ontvangen!',
      cancelButtonText: 'Nee, is nog niet ontvangen'
    }).then((result) => {
      if (result.value) {
        this.bookingService.setPaid(this.booking.id).subscribe((response: any) => {
          this.ngOnInit();
        });
      }
    });
  }
}
