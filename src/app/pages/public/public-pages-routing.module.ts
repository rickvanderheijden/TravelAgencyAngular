import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';


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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }
