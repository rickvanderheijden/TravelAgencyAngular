import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCreateComponent } from './destination-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DestinationCreateComponent,
  ]
})
export class DestinationCreateModule { }
