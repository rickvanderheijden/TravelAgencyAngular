import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TripItemRoutingModule} from './trip-routing.module';
import {TripItemActionButtonsComponent, TripItemComponent} from './trip-item.component';


@NgModule({
  imports: [
    CommonModule,
    TripItemRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [TripItemActionButtonsComponent
  ],
  declarations: [
    TripItemComponent,
    TripItemActionButtonsComponent
  ]
})
export class TripItemModule { }
