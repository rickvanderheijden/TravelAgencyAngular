import { Component, OnInit } from '@angular/core';
import { TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit {
  tripCreateForm: FormGroup;
  trip: Trip;
  loading = false;

  constructor(private tripService: TripService, private router: Router) {
    this.trip = new Trip();
  }

  ngOnInit() {
  }

  enterTrip() {
    if (this.trip) {
      this.tripService.createTrip(this.trip).subscribe(
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
