import { Component, OnInit } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.scss']
})
export class TripUpdateComponent implements OnInit {
  trip: Trip;
  tripId: any;
  loading = false;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) {
    this.tripService.getById(route.snapshot.params.id).subscribe((data: any) => {
      console.log(data);
      this.trip = data;
      this.tripId = route.snapshot.params.id;
    });
  }

  ngOnInit() {
  }

  updateTrip() {
    if (this.trip) {
      this.tripService.updateTrip(this.trip).subscribe(
        (response: any) => {
          console.log(response);
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/trip/']);
  }
}
