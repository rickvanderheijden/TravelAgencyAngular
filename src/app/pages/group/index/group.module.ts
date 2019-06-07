import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {GroupActionButtonsComponent, GroupComponent} from './group.component';
import {GroupRoutingModule} from './group-routing.module';


@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [GroupActionButtonsComponent
  ],
  declarations: [
    GroupComponent,
    GroupActionButtonsComponent
  ]
})
export class GroupModule { }
