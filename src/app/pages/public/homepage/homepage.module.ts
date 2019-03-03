import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PublicPagesRoutingModule} from '../public-pages-routing.module';
import {HomepageComponent} from './homepage.component';

@NgModule({
  imports: [
    CommonModule,
    PublicPagesRoutingModule
  ],
  declarations: [
    HomepageComponent
  ]
})
export class HomepageModuleModule { }
