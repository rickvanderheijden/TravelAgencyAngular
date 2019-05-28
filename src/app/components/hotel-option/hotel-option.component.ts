import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-hotel-option',
  templateUrl: './hotel-option.component.html',
  styleUrls: ['./hotel-option.component.scss']
})
export class HotelOptionComponent implements OnInit {

  @Input()
  hotel: Hotel;

  constructor() { }

  ngOnInit() {
  }

}
