import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';
import {Service} from '../../../models/service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input()
  tripId: number;
  trip: Trip;
  // tripServices: TripService[];
  loading = false;
  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.loading = true;
    this.tripService.getById(this.tripId).subscribe(
      (response: any) => {
        this.trip = response;
        // this.tripServices = this.trip.tripServices;
        this.loading = false;
      }
    );
  }
}
