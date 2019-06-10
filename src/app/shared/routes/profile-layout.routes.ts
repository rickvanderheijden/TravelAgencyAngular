import {Routes} from '@angular/router';

export const Profile_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/profile/profile.module#ProfileModule'
  },
];
