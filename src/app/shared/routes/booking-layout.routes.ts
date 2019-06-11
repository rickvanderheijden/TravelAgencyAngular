import {Routes} from '@angular/router';

export const Booking_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/booking/booking.module#BookingModule'
  },
];
