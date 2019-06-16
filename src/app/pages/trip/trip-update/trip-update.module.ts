import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripUpdateComponent } from './trip-update.component';
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
    TripUpdateComponent,
  ]
})
export class TripUpdateModule { }
