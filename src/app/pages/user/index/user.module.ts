import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserActionButtonsComponent, UserAuthorityComponent, UserComponent} from './user.component';
import { UserRoutingModule} from './user-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbAccordionModule, NgbPanel} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [UserAuthorityComponent, UserActionButtonsComponent
  ],
  declarations: [
    UserComponent,
    UserAuthorityComponent,
    UserActionButtonsComponent
  ]
})
export class UserModule { }
