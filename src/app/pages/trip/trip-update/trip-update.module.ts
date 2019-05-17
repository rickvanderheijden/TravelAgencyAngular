import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripUpdateComponent } from './trip-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    TripUpdateComponent,
  ]
})
export class TripUpdateModule { }
