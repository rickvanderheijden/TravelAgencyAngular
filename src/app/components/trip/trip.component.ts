import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';
import {TripItem} from '../../../models/TripItem';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input()
  tripId: number;
  trip: Trip;
  tripItems: TripItem[];
  loading = false;
  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.loading = true;
    this.tripService.getById(this.tripId).subscribe(
      (response: any) => {
        this.trip = response;
        this.tripItems = this.trip.tripItems;
        this.loading = false;
      }
    );
  }
}
