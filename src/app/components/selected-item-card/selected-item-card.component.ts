import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthenticationService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Travel} from '../../../models/travel';
import {TripItem} from '../../../models/TripItem';
import {Trip} from '../../../models/trip';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-selected-item-card',
  templateUrl: './selected-item-card.component.html',
  styleUrls: ['./selected-item-card.component.scss']
})
export class SelectedItemCardComponent implements OnInit {

  public modalRef: BsModalRef;

  @Input()
  travel: Travel;

  @Input()
  trip: Trip;

  @Output()
  tripItemOut = new EventEmitter<TripItem>();

  @Output()
  hotelOut = new EventEmitter<Hotel>();

  constructor(private authenticationService: AuthenticationService, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.travel = new Travel();
    this.travel.trip = this.trip;
    this.travel.totalPrice = this.trip.totalPrice;

    // Hotel are static for now. Add them to travel.
    const hotels = this.travel.hotels;
    this.travel.trip.destinations.forEach(function(destination) {
      if (destination.hotel !== null) {
        hotels.push(destination.hotel);
      }
    });

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

  bookTravel() {
    console.log('bookTravel');
    console.log(this.travel);
    this.router.navigateByUrl('/booktravel', { state: { travel: this.travel } });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  didLoginSuccessful(loginSuccessful: boolean) {
    if (loginSuccessful) {
      this.modalRef.hide();
      this.router.navigateByUrl('/booktravel', { state: { travel: this.travel } });
    }
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


}
