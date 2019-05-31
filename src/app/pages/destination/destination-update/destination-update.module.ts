import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationUpdateComponent } from './destination-update.component';
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
    DestinationUpdateComponent,
  ]
})
export class DestinationUpdateModule { }
