import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {GroupComponent} from '../../../components/group/group.component';
import {NgbAccordionModule, NgbModule, NgbPanel} from '@ng-bootstrap/ng-bootstrap';
import {GroupDetailComponent} from '../../../components/group-detail/group-detail.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    UserUpdateComponent,
    GroupComponent,
    GroupDetailComponent,
  ]
})
export class UserUpdateModule { }
