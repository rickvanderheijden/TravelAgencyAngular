import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Travel} from 'models/travel';

@Component({
  selector: 'app-booktravel',
  templateUrl: './booktravel.component.html',
  styleUrls: ['./booktravel.component.scss']
})
export class BookTravelComponent implements OnInit {
  travelObservable: Observable<Travel>;
  travel: Travel;
  loading = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;

    this.travelObservable = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

    this.travelObservable.subscribe((value: Travel) => {
      console.log(value);
    });

    console.log(this.travelObservable);

    console.log(this.travel.totalPrice);
  }
}
