import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../../models/service';

@Component({
  selector: 'app-trip-service-option',
  templateUrl: './trip-service-option.component.html',
  styleUrls: ['./trip-service-option.component.scss']
})
export class TripServiceOptionComponent implements OnInit {

  @Input()
  service: Service;
  constructor() { }

  ngOnInit() {
  }

}
