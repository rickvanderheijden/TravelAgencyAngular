import {Routes} from '@angular/router';

export const BookTravel_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/booktravel/booktravel.module#BookTravelModule'
  },
];
