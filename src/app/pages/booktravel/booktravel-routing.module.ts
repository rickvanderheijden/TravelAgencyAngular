import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BookTravelComponent} from './booktravel.component';

const routes: Routes = [
  {
    path: '',
    component: BookTravelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookTravelRoutingModule { }
