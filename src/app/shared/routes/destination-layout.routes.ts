import {Routes} from '@angular/router';

export const Destination_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/destination/index/destination.module#DestinationModule'
  },
];
