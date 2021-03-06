import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TripItemUpdateComponent} from './trip-item-update.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {TripItemCreateModule} from '../create/trip-item-create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    TripItemCreateModule
  ],
  declarations: [
    TripItemUpdateComponent,
  ]
})
export class TripItemUpdateModule { }
