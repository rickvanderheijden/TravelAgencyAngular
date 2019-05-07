import { Component, OnInit } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.scss']
})
export class TripUpdateComponent implements OnInit {
  tripUpdateForm: FormGroup;
  trip: Trip;
  tripId: any;
  loading = false;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) {
    this.tripService.getById(route.snapshot.params.id).subscribe((data: any) => {
      this.trip = new Trip(data);
      console.log(this.trip);
      this.tripId = route.snapshot.params.id;
      this.setForm();
    });
  }

  ngOnInit() {
  }

  updateTrip() {
    if (this.trip) {
      this.tripService.updateTrip(this.trip).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/trip/']);
  }

  setForm() {
    this.tripUpdateForm = new FormGroup({
      name: new FormControl(this.trip.name, [Validators.minLength(4), Validators.required]),
      description: new FormControl(this.trip.description),
      summary: new FormControl(this.trip.summary),
      imageUrl: new FormControl(this.trip.imageUrl, [Validators.minLength(6), Validators.email, Validators.required]),
      totalPrice: new FormControl(this.trip.totalPrice, [Validators.minLength(5)]),
      discount: new FormControl(this.trip.discount)
    });
  }
}
