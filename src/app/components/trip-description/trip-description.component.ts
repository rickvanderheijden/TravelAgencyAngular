import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Trip} from '../../../models/trip';
import {Travel} from '../../../models/travel';
import {TripItem} from '../../../models/TripItem';
import {AuthenticationService} from '../../auth/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-trip-description',
  templateUrl: './trip-description.component.html',
  styleUrls: ['./trip-description.component.scss'],
})

export class TripDescriptionComponent implements OnInit {
  public modalRef: BsModalRef;

  @Input()
  trip: Trip;

  @Input()
  travel: Travel;

  @Output()
  tripItemOut = new EventEmitter<TripItem>();

  @Output()
  hotelOut = new EventEmitter<Hotel>();

  loading = false;
  constructor(private authenticationService: AuthenticationService, private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
    this.travel = new Travel();
    this.travel.trip = this.trip;
    this.travel.totalPrice = this.trip.totalPrice;
  }

  addTripItem(tripItem: TripItem) {
    let found = false;
    for (const travelTripItem of this.travel.tripItems) {
      if (travelTripItem.id === tripItem.id) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.travel.addTripItem(tripItem);
    }
  }

  removeTripItem(tripItem: TripItem) {
    this.travel.removeTripItem(tripItem);
    this.tripItemOut.emit(tripItem);
  }

  addHotel(hotel: Hotel) {
    let found = false;
    for (const travelHotel of this.travel.hotels) {
      if (travelHotel.id === hotel.id) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.travel.addHotel(hotel);
    }
  }

  removeHotel(hotel: Hotel) {
    this.travel.removeHotel(hotel);
    this.hotelOut.emit(hotel);
  }

  bookTravel() {
    this.router.navigateByUrl('/booktravel', { state: { travel: this.travel } });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  didLoginSuccessful(loginSuccessful: boolean) {
    if (loginSuccessful){
      this.modalRef.hide();
      this.router.navigateByUrl('/booktravel', { state: { travel: this.travel } });
    }
  }
}
