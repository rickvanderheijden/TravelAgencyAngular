import { Component, OnInit } from '@angular/core';
import {Trip} from '../../../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips: Array<Trip> = new Array<Trip>();
  constructor() {
    this.trips.push(new Trip( {
      id: 1,
      name: 'This is the first trip',
      total_price: 1200,
      image_url: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/Hawaii-1200x853.jpg'
    }))

    this.trips.push(new Trip( {
      id: 2,
      name: 'This is the second trip',
      total_price: 1300,
      image_url: 'http://37.97.245.56/upload/artikel-figuren/cordes-beurs-noorwegen-1200.jpg'
    }))
  }

  ngOnInit() {
  }

}
