import {Routes} from '@angular/router';

export const Hotel_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/hotel/index/hotel.module#HotelModule'
  },
];
