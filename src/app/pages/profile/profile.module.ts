import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap';
import {UserUpdateModule} from '../user/user-update/user-update.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    CollapseModule,
    UserUpdateModule
  ]
})
export class ProfileModule { }
