import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TripComponent} from './trip.component';
import {TripCreateComponent} from '../trip-create/trip-create.component';
import {TripUpdateComponent} from '../trip-update/trip-update.component';
import {TripCreateModule} from '../trip-create/trip-create.module';
import {TripUpdateModule} from '../trip-update/trip-update.module';
import {AdminGuard} from '../../../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
  },
  {
    path: 'create',
    component: TripCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'update/:id',
    component: TripUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TripCreateModule, TripUpdateModule],
  exports: [RouterModule],
})
export class TripRoutingModule { }
