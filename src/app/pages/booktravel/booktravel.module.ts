import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookTravelComponent} from './booktravel.component';
import {BookTravelRoutingModule} from './booktravel-routing.module';
import {ArchwizardModule} from 'angular-archwizard';
import {TravelSummaryComponent} from '../../components/travel-summary/travel-summary.component';
import {BookingTravelerInformationComponent} from '../../components/booking-traveler-information/booking-traveler-information.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {BookingInvoiceComponent} from '../../components/booking-invoice/booking-invoice.component';
import {PaymentComponent} from '../../components/payment/payment.component';

@NgModule({
  imports: [
    ArchwizardModule,
    BookTravelRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  declarations: [BookTravelComponent, TravelSummaryComponent, BookingTravelerInformationComponent, BookingInvoiceComponent, PaymentComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BookTravelModule { }
