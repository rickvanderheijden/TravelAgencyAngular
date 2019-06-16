import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingActionButtonsComponent, BookingComponent} from './booking.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {BookingRoutingModule} from './booking-routing.module';

@NgModule({
  declarations: [BookingComponent, BookingActionButtonsComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [BookingActionButtonsComponent
  ],
})
export class BookingModule { }
