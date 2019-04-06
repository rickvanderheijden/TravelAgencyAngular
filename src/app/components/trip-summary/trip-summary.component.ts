import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrls: ['./trip-summary.component.scss']
})
export class TripSummaryComponent implements OnInit {

  @Input()
  trip: Trip;
  constructor() { }

  ngOnInit() {
  }

}
