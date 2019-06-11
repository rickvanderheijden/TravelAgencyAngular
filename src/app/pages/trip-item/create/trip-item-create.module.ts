import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TripItemCreateComponent} from './trip-item-create.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropZoneComponent} from '../../../components/drop-zone/drop-zone.component';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    FileUploadModule
  ],
  providers: [DropZoneComponent],
  declarations: [
    TripItemCreateComponent,
    DropZoneComponent
  ],
  exports: [
    DropZoneComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TripItemCreateModule { }
