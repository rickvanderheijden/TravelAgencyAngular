import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DestinationComponent} from './destination.component';
import {DestinationCreateComponent} from '../destination-create/destination-create.component';
import {DestinationUpdateComponent} from '../destination-update/destination-update.component';
import {DestinationCreateModule} from '../destination-create/destination-create.module';
import {DestinationUpdateModule} from '../destination-update/destination-update.module';
import {AdminGuard} from '../../../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DestinationComponent,
  },
  {
    path: 'create',
    component: DestinationCreateComponent,
    // canActivate: [AdminGuard]
  },
  {
    path: 'update/:id',
    component: DestinationUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DestinationCreateModule, DestinationUpdateModule],
  exports: [RouterModule],
})
export class DestinationRoutingModule { }
