import { Component, OnInit } from '@angular/core';
import { TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit {
  trip: Trip;

  constructor(private tripService: TripService) {
    this.trip = new Trip();
  }

  ngOnInit() {
  }

  enterTrip() {
    if (this.trip) {
      this.tripService.createTrip(this.trip).subscribe(
        (response: any) => {
          console.log(response);
        });
    }
  }
}
