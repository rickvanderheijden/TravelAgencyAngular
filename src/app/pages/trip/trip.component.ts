import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  name: string;
  total_price: string;

  constructor() { }

  ngOnInit() {
  }

  enterTrip() {
    if (this.name && this.total_price) {
    // create Trip
    }
  }

}
