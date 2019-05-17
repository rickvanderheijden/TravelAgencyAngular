import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminGuard} from '../../../services/admin.guard';
import {TripItemComponent} from './trip-item.component';
import {TripItemCreateComponent} from '../create/trip-item-create.component';
import {TripItemCreateModule} from '../create/trip-item-create.module';
import {TripItemUpdateModule} from '../update/trip-item-update.module';
import {TripItemUpdateComponent} from '../update/trip-item-update.component';



const routes: Routes = [
  {
    path: '',
    component: TripItemComponent,
  },
  {
    path: 'create',
    component: TripItemCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'update/:id',
    component: TripItemUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TripItemCreateModule, TripItemUpdateModule],
  exports: [RouterModule],
})
export class TripItemRoutingModule { }
