import {Routes} from '@angular/router';

export const Group_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/group/index/group.module#GroupModule'
  },
];
