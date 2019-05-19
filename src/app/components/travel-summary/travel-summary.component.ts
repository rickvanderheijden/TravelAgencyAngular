import {Component, Input, OnInit} from '@angular/core';
import {Travel} from '../../../models/travel';

@Component({
  selector: 'app-travel-summary',
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.scss']
})
export class TravelSummaryComponent implements OnInit {

  @Input()
  travel: Travel;

  constructor() {
  }

  ngOnInit() {
    console.log(this.travel);
  }

}
