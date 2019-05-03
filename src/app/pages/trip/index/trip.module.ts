import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TripActionButtonsComponent, TripComponent} from './trip.component';
import { TripRoutingModule} from './trip-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    TripRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [TripActionButtonsComponent
  ],
  declarations: [
    TripComponent,
    TripActionButtonsComponent
  ]
})
export class TripModule { }
