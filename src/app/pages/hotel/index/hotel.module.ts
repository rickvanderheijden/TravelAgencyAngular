import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HotelActionButtonsComponent, HotelComponent} from './hotel.component';
import { HotelRoutingModule} from './hotel-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [HotelActionButtonsComponent
  ],
  declarations: [
    HotelComponent,
    HotelActionButtonsComponent
  ]
})
export class HotelModule { }
