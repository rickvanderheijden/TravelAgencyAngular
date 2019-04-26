import {Routes} from '@angular/router';

export const TripItem_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/trip-item/index/trip-item.module#TripItemModule'
  },
];
