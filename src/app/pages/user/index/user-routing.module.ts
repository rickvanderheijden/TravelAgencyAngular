import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserComponent} from './user.component';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserUpdateComponent} from '../user-update/user-update.component';
import {UserCreateModule} from '../user-create/user-create.module';
import {UserUpdateModule} from '../user-update/user-update.module';
import {AdminGuard} from '../../../services/admin.guard';
import {Trip_ROUTES} from '../../../shared/routes/trip-layout.routes';
import {UserUpdateResolver} from '../../../resolvers/user-update.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'create',
    component: UserCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'update/:id',
    component: UserUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserCreateModule, UserUpdateModule],
  exports: [RouterModule],
})
export class UserRoutingModule { }
