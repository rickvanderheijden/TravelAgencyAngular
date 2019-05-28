import {Component, OnInit, TemplateRef} from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

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
  tripItems: Array<TripItem>;
  selectedTripItems: Array<any>;

  constructor(
    private tripService: TripService,
    private tripItemService: TripItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.tripItemService.getTripItems().subscribe((tripItems: any) => {
      this.tripItems = tripItems;
      this.tripService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.trip = new Trip(data);
        this.tripId = this.route.snapshot.params.id;
        this.setForm();
        this.loading = false;
      });
    });
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
      discount: new FormControl(this.trip.discount),
      // tripItems: new FormControl(this.trip.tripItems)
    });
  }

}
