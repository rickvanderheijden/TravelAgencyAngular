import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookTravelComponent} from './booktravel.component';
import {BookTravelRoutingModule} from './booktravel-routing.module';
import {ArchwizardModule} from 'angular-archwizard';
import {TravelSummaryComponent} from '../../components/travel-summary/travel-summary.component';

@NgModule({
  imports: [
    ArchwizardModule,
    BookTravelRoutingModule,
    CommonModule,
  ],
  providers: [],
  declarations: [BookTravelComponent, TravelSummaryComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BookTravelModule { }
