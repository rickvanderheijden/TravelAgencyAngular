import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {GroupComponent} from '../../../components/group/group.component';
import {NgbAccordionModule, NgbModule, NgbPanel} from '@ng-bootstrap/ng-bootstrap';
import {GroupDetailComponent} from '../../../components/group-detail/group-detail.component';
import {MatTabsModule} from '@angular/material';
import {ChatComponent} from '../../../components/chat/chat.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatTabsModule
  ],
  exports: [
    GroupComponent
  ],
  declarations: [
    UserUpdateComponent,
    GroupComponent,
    GroupDetailComponent,
    ChatComponent,
  ]
})
export class UserUpdateModule { }
