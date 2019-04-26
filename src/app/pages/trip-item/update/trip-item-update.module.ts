import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TripItemUpdateComponent} from './trip-item-update.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TripItemUpdateComponent,
  ]
})
export class TripItemUpdateModule { }
