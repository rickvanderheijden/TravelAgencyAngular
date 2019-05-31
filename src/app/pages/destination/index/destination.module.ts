import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DestinationActionButtonsComponent, DestinationComponent} from './destination.component';
import { DestinationRoutingModule} from './destination-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    DestinationRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [DestinationActionButtonsComponent
  ],
  declarations: [
    DestinationComponent,
    DestinationActionButtonsComponent
  ]
})
export class DestinationModule { }
