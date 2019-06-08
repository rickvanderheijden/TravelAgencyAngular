import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../../models/trip';
import {Booking} from '../../../../models/booking';

@Component({
  selector: 'app-booked-item',
  templateUrl: './booked-item.component.html',
  styleUrls: ['./booked-item.component.scss']
})
export class BookedItemComponent implements OnInit {

  @Input()
  trip: Trip;
  @Input()
   booking: Booking;
  constructor() { }

  ngOnInit() {
  }

}
