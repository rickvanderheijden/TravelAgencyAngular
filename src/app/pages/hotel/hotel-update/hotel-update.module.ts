import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelUpdateComponent } from './hotel-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TripItemCreateModule} from '../../trip-item/create/trip-item-create.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TripItemCreateModule
  ],
  declarations: [
    HotelUpdateComponent,
  ]
})
export class HotelUpdateModule { }
