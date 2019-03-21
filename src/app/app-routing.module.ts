import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';

import {PUBLIC_ROUTES} from './shared/routes/public.routes';

import {AuthLoginComponent} from './auth/auth-login.component';
import {AuthGuardService} from './auth/auth.guard';

import {MapsComponent} from './maps/maps.component';



const appRoutes: Routes = [
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: 'maps', component: MapsComponent
  },
  { 
  // { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES /*, canActivate: [AuthGuardService]*/ },
  { path: '', component: FullLayoutComponent, data: { title: 'Scrum Air' }, children: PUBLIC_ROUTES },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
