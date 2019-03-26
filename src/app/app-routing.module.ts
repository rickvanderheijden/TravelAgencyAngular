import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';

import {PUBLIC_ROUTES} from './shared/routes/public.routes';

import {AuthLoginComponent} from './auth/auth-login.component';
import {AuthGuardService} from './auth/auth.guard';
import {MapsComponent} from './maps/maps.component';
import {HOME_ROUTES} from './shared/routes/home.routes';
import {HomepageComponent} from './pages/public/homepage/homepage.component';




const appRoutes: Routes = [
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: 'maps', component: MapsComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: HOME_ROUTES,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
