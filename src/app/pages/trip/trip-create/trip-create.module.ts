import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCreateComponent } from './trip-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TripItemCreateModule} from '../../trip-item/create/trip-item-create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TripItemCreateModule
  ],
  declarations: [
    TripCreateComponent,
  ]
})
export class TripCreateModule { }
