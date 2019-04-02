import {Routes} from '@angular/router';

export const User_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/user/index/user.module#UserModule'
  },
];
