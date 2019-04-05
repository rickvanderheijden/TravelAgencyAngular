import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {MapsComponent} from '../../components/maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [MapsComponent],
  declarations: [HomeComponent, MapsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
