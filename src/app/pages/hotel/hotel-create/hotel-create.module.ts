import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCreateComponent } from './hotel-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    HotelCreateComponent,
  ]
})
export class HotelCreateModule { }
