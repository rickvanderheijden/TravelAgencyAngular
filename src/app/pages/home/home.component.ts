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
  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.loading = true;
    this.tripService.getTrips().subscribe(
      (response: any) => {
       this.trips = response;
       this.loading = false;
      }
    );
  }

}
