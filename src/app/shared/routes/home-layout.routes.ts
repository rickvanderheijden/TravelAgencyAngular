import {Routes} from '@angular/router';

export const Home_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },
];
