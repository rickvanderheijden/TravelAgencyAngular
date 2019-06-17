import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GroupComponent} from './group.component';
import {GroupCreateComponent} from '../group-create/group-create.component';
import {GroupCreateModule} from '../group-create/group-create.module';
import {GroupUpdateComponent} from '../group-update/group-update.component';
import {GroupUpdateModule} from '../group-update/group-update.module';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
  },
  {
    path: 'create/:id',
    component: GroupCreateComponent,
    // canActivate: [AdminGuard]
  },
  {
    path: 'update/:id',
    component: GroupUpdateComponent,
    // canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GroupCreateModule, GroupUpdateModule],
  exports: [RouterModule],
})
export class GroupRoutingModule { }
