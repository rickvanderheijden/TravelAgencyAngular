import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookTravelComponent} from './booktravel.component';
import {BookTravelRoutingModule} from './booktravel-routing.module';

@NgModule({
  imports: [
    BookTravelRoutingModule,
    CommonModule,
  ],
  providers: [],
  declarations: [BookTravelComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BookTravelModule { }
