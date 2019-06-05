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
import {AgmCoreModule} from '@agm/core';
import {TripItemOptionComponent} from '../../components/trip-item-option/trip-item-option.component';
import {DestinationComponent} from '../../components/destination/destination.component';
import {HotelOptionComponent} from '../../components/hotel-option/hotel-option.component';
import {TopFiltersComponent} from '../../components/top-filters/top-filters.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {LoginFormComponent} from '../../components/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOfZ8iIVLx_0ndsNG1MyMkhvbm2T_h-o4'
    }),
    AgmDirectionModule,
    NgSelectModule
  ],
  providers: [MapsComponent],
  declarations: [
    HomeComponent,
    MapsComponent,
    TripComponent,
    TripListComponent,
    TripSummaryComponent,
    TripDescriptionComponent,
    TripItemOptionComponent,
    DestinationComponent,
    HotelOptionComponent,
    TopFiltersComponent,
    LoginFormComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
