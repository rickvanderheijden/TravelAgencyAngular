import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  @Input()
  trips: Array<Trip>;
  constructor() {  }

  ngOnInit() {
  }

}
