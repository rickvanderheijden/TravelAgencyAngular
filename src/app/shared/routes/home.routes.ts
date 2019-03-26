import {Routes} from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: './pages/public/homepage/homepage.module#HomepageModule'
  }
];
