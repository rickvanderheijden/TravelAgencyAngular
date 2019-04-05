import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent} from './user.component';
import { UserRoutingModule} from './user-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
