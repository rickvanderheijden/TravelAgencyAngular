import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {GroupComponent} from '../../../components/group/group.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UserUpdateComponent,
    GroupComponent,
  ]
})
export class UserUpdateModule { }
