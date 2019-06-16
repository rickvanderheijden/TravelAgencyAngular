import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthenticationService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Travel} from '../../../models/travel';
import {TripItem} from '../../../models/TripItem';
import {Trip} from '../../../models/trip';
import {Hotel} from '../../../models/hotel';
import {MapsComponent} from '../maps/maps.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-selected-item-card',
  templateUrl: './selected-item-card.component.html',
  styleUrls: ['./selected-item-card.component.scss']
})
export class SelectedItemCardComponent implements OnInit {

  @ViewChild(MapsComponent) mapsComponent;

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

    const destinationLength = this.travel.trip.destinations.length;

    if (destinationLength >= 2) {
      const firstDestination = this.travel.trip.destinations[0].city.name;
      const lastDestination = this.travel.trip.destinations[destinationLength - 1].city.name;
      this.mapsComponent.setDirection(firstDestination, lastDestination);

      if (destinationLength > 2) {
        for (let index = 1; index < (destinationLength - 1); index++) {
          this.mapsComponent.addWaypoint(this.travel.trip.destinations[index].city.name, true);
        }
      }
    } else if (destinationLength === 1) {
      const destination = this.travel.trip.destinations[0].city.name;
      this.mapsComponent.setDirection(destination, destination);
      this.mapsComponent.setZoom(12);
    }


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
    swal({
      title: 'Weet je het zeker?',
      text: 'Weet je zeker dat je het product van de reis wil verwijderen',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, verwijderen!',
      cancelButtonText: 'Nee, product behouden'
    }).then((result) => {
      if (result.value) {
        this.travel.removeTripItem(tripItem);
        this.tripItemOut.emit(tripItem);
      }
    });
  }

  bookTravel() {
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
