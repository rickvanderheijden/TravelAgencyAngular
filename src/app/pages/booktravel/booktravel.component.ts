import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Travel} from 'models/travel';
import {TravelSummaryComponent} from '../../components/travel-summary/travel-summary.component';
import {BookingTravelerInformationComponent} from '../../components/booking-traveler-information/booking-traveler-information.component';
import {User} from '../../../models/user';
import {Booking} from '../../../models/booking';
import {BookingService} from '../../services/booking.service';
import {Payment} from '../../../models/Payment';
import swal from 'sweetalert2';
import {WizardComponent} from 'angular-archwizard';

@Component({
  selector: 'app-booktravel',
  templateUrl: './booktravel.component.html',
  styleUrls: ['./booktravel.component.scss']
})
export class BookTravelComponent implements OnInit {

  @ViewChild(TravelSummaryComponent) travelSummaryComponent;
  @ViewChild(BookingTravelerInformationComponent) bookingTravelerInformationComponent;
  @ViewChild(WizardComponent) public wizard: WizardComponent;

  travelObservable: Observable<Travel>;
  loading = false;
  travel: Travel;
  booking: Booking = null;
  savedBooking: Booking = null;
  paymentStepEnabled = false;
  paymentStepSucceeded = false;

  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService, private router: Router) { }

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
    this.router.navigate(['/']);
  }

  pushBooking() {
    this.booking = this.travelSummaryComponent.getBooking();
  }

  pushTravelInformation() {
    const travelerInformation = this.bookingTravelerInformationComponent.getFormValues();
    const booker = new User(JSON.parse(sessionStorage.getItem('currentUser')));
    this.booking.booker = booker;
    this.booking.address = travelerInformation.address;
  this.booking.setTravelers(travelerInformation.travelers);

    this.bookingService.createBooking(this.booking).subscribe(response => this.savedBooking = new Booking(response));
  }

  enablePaymentStep(enabled: boolean) {
    this.paymentStepEnabled = enabled;
  }

  paymentOut(payment: Payment) {
    swal('Succes', 'Betaling geslaagd!', 'success');
    this.bookingService.getById(payment.bookingId).subscribe((booking: Booking) => {
      this.savedBooking = booking;
      this.paymentStepSucceeded = true;
      this.wizard.navigation.goToNextStep();
    });
  }
}
