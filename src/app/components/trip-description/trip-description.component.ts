import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip';

@Component({
  selector: 'app-trip-description',
  templateUrl: './trip-description.component.html',
  styleUrls: ['./trip-description.component.scss'],
})

export class TripDescriptionComponent  {

  @Input()
  trip: Trip;

  loading = false;
  constructor() {
  }
}
