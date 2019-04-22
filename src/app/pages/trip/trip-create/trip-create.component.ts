import { Component, OnInit } from '@angular/core';
import { TripService} from '../../../services/trip.service';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit {

  name: string;
  description: string;
  summary: string;
  imageUrl: string;
  total_price: number;
  discount: number;

  constructor(private tripService: TripService) { }

  ngOnInit() {
  }

  enterTrip() {
    this.tripService.createTrip(this.name, this.description, this.summary, this.imageUrl, this.total_price, this.discount);
    if (this.name && this.description && this.summary && this.imageUrl &&  this.total_price && this.discount) {
    }
  }
}
