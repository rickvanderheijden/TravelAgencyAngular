import { Component, OnInit } from '@angular/core';
import { TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    this.tripCreateForm = new FormGroup({
      name: new FormControl(this.trip.name, [Validators.minLength(4), Validators.required]),
      description: new FormControl(this.trip.description),
      summary: new FormControl(this.trip.summary),
      imageUrl: new FormControl(this.trip.imageUrl, [Validators.minLength(6), Validators.email, Validators.required]),
      totalPrice: new FormControl(this.trip.totalPrice, [Validators.minLength(5)]),
      discount: new FormControl(this.trip.discount)
    });
  }

  ngOnInit() {
  }

  enterTrip() {
    if (this.trip) {
      this.tripService.createTrip(this.trip).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/trip/']);
  }


}
