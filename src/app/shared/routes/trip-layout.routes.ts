import {Routes} from '@angular/router';

export const Trip_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/trip/index/trip.module#TripModule'
  },
];
