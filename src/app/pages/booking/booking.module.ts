import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingActionButtonsComponent, BookingComponent} from './booking.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {BookingRoutingModule} from './booking-routing.module';
import {BookingReadComponent} from './read/booking-read.component';

@NgModule({
  declarations: [BookingComponent, BookingActionButtonsComponent, BookingReadComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class BookingModule { }
