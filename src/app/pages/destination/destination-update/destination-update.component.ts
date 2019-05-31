import {Component, OnInit, TemplateRef} from '@angular/core';
import {DestinationService} from '../../../services/destination.service';
import {Destination} from '../../../../models/destination';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';

@Component({
  selector: 'app-destination-update',
  templateUrl: './destination-update.component.html',
  styleUrls: ['./destination-update.component.scss']
})
export class DestinationUpdateComponent implements OnInit {
  destinationUpdateForm: FormGroup;
  destination: Destination;
  destinationId: any;
  loading = false;
  dbTripItems: Array<TripItem>;
  selectedTripItems: Array<any>;

  constructor(
    private destinationService: DestinationService,
    private tripItemService: TripItemService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.tripItemService.getTripItems().subscribe((destinationItems: any) => {
      this.dbTripItems = destinationItems;
      this.destinationService.getById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.destination = new Destination(data);
        this.destinationId = this.route.snapshot.params.id;
        this.setForm();
        this.loading = false;
      });
    });
  }

  updateDestination() {
    if (this.destination) {
      this.destinationService.updateDestination(this.destination).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/destination/']);
  }

  setForm() {
    this.destinationUpdateForm = new FormGroup({
      name: new FormControl(this.destination.name, [Validators.minLength(4), Validators.required]),
      hotel: new FormControl(this.destination.hotel),
      city: new FormControl(this.destination.city),
      tripItems: new FormControl(this.destination.tripItems)

    });
    this.formBuilder.group(this.destinationUpdateForm);

  }

  get desinations() {
    return this.formBuilder.group({
      destinationName: '',
      destinationItems: this.formBuilder.array([this.destinationItems])
    });
  }

  get destinationItems() {
    return this.formBuilder.group({
      destinationItemName: ''
    });
  }

  addDestination() {
    (this.destinationUpdateForm.get('destinations') as FormArray).push(this.destinationItems);
  }

}
