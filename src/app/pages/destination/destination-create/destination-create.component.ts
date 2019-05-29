import { Component, OnInit } from '@angular/core';
import { DestinationService} from '../../../services/destination.service';
import {Destination} from '../../../../models/destination';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-destination-create',
  templateUrl: './destination-create.component.html',
  styleUrls: ['./destination-create.component.scss']
})
export class DestinationCreateComponent implements OnInit {
  destinationCreateForm: FormGroup;
  destination: Destination;
  loading = false;

  constructor(private destinationService: DestinationService, private router: Router) {
    this.destination = new Destination();

    this.destinationCreateForm = new FormGroup({
      name: new FormControl(this.destination.name, [Validators.minLength(4), Validators.required]),
      hotel: new FormControl(this.destination.hotel),
      city: new FormControl(this.destination.city),
      tripItems: new FormControl(this.destination.tripItems)
    });
  }

  ngOnInit() {
  }

  enterDestination() {
    if (this.destination) {
      this.destinationService.createDestination(this.destination).subscribe(
        (response: any) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/destination/']);
  }


}
