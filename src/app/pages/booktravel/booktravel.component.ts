import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Travel} from 'models/travel';
import {Booking} from '../../../models/booking';
import {TravelSummaryComponent} from '../../components/travel-summary/travel-summary.component';

@Component({
  selector: 'app-booktravel',
  templateUrl: './booktravel.component.html',
  styleUrls: ['./booktravel.component.scss']
})
export class BookTravelComponent implements OnInit {
  @ViewChild(TravelSummaryComponent) travelSummaryComponent;
  travelObservable: Observable<Travel>;
  loading = false;
  travel: Travel;
  booking: Booking = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.travelObservable = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.travel));

    this.travelObservable.subscribe((value: Travel) => {
      this.travel = value;
    });
  }

  backToTravelPage() {
  }

  finishFunction() {
  }

  pushBooking() {
    this.booking = this.travelSummaryComponent.getBooking();
  }
}
