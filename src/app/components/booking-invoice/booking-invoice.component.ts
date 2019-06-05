import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../../models/booking';

@Component({
  selector: 'app-booking-invoice',
  templateUrl: './booking-invoice.component.html',
  styleUrls: ['./booking-invoice.component.scss']
})
export class BookingInvoiceComponent implements OnInit {

  @Input()
  booking: Booking;

  constructor() { }

  ngOnInit() {
  }

}
