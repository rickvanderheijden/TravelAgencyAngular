import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {FullLayoutPageComponent} from '../full-layout-page/full-layout-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: 'Home'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule { }
