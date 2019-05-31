import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelComponent} from './hotel.component';
import {HotelCreateComponent} from '../hotel-create/hotel-create.component';
import {HotelUpdateComponent} from '../hotel-update/hotel-update.component';
import {HotelCreateModule} from '../hotel-create/hotel-create.module';
import {HotelUpdateModule} from '../hotel-update/hotel-update.module';
import {AdminGuard} from '../../../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
  },
  {
    path: 'create',
    component: HotelCreateComponent,
    // canActivate: [AdminGuard]
  },
  {
    path: 'update/:id',
    component: HotelUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HotelCreateModule, HotelUpdateModule],
  exports: [RouterModule],
})
export class HotelRoutingModule { }
