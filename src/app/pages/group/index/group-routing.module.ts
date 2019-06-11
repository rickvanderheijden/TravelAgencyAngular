import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GroupComponent} from './group.component';
import {GroupCreateComponent} from '../group-create/group-create.component';
import {GroupCreateModule} from '../group-create/group-create.module';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes), GroupCreateModule],
  exports: [RouterModule],
})
export class GroupRoutingModule { }
