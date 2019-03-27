import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: 'Full Layout Page'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule { }