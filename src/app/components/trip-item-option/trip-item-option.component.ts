import {Component, Input, OnInit} from '@angular/core';
import {TripItem} from '../../../models/TripItem';

@Component({
  selector: 'app-trip-item-option',
  templateUrl: './trip-item-option.component.html',
  styleUrls: ['./trip-item-option.component.scss']
})
export class TripItemOptionComponent implements OnInit {

  @Input()
  tripItem: TripItem;
  constructor() { }

  ngOnInit() {
  }

}
