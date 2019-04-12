import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {MapsComponent} from '../../components/maps/maps.component';
import {TripComponent} from '../../components/trip/trip.component';
import {TripListComponent} from '../../components/trip-list/trip-list.component';
import {TripSummaryComponent} from '../../components/trip-summary/trip-summary.component';
import {AgmDirectionModule} from 'agm-direction';
import {TripDescriptionComponent} from '../../components/trip-description/trip-description.component';
import {TripServiceOptionComponent} from '../../components/trip-service-option/trip-service-option.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [MapsComponent],
  declarations: [HomeComponent, MapsComponent, TripComponent, TripListComponent, TripSummaryComponent, TripDescriptionComponent, TripServiceOptionComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
