import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripUpdateComponent } from './trip-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TripUpdateComponent,
  ]
})
export class TripUpdateModule { }
