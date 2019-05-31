import { Component, OnInit } from '@angular/core';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trips: Array<Trip>;
  loading = false;
  tripId: number;
  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.loading = true;
    this.tripId = null;
    this.tripService.getTrips().subscribe(
      (response: any) => {
       this.trips = response;
       this.loading = false;
      }
    );
  }

  onTripIdChanged(id: number) {
    this.tripId = id;
  }

  setTrips(event: Array<Trip>) {
    this.trips = event;
  }
}
