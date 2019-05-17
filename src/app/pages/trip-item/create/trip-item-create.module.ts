import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TripItemCreateComponent} from './trip-item-create.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FileUploadModule} from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgSelectModule
  ],
  declarations: [
    TripItemCreateComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TripItemCreateModule { }
