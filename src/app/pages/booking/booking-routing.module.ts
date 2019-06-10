import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BookingComponent} from './booking.component';
import {BookingReadComponent} from './read/booking-read.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  },
  {
    path: 'read/:id',
    component: BookingReadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule { }
