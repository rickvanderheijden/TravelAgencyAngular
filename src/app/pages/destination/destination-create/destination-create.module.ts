import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCreateComponent } from './destination-create.component';
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
    DestinationCreateComponent,
  ]
})
export class DestinationCreateModule { }
