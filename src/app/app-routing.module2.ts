import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import {PUBLIC_ROUTES} from './shared/routes/public.routes';

import {AuthLoginComponent} from './auth/auth-login.component';
import {AuthGuardService} from './auth/auth.guard';
import {HomepageComponent} from './pages/public/homepage/homepage.component';
import {MapsComponent} from './maps/maps.component';



const appRoutes: Routes = [
<<<<<<< HEAD
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: 'maps', component: MapsComponent
  },
=======
  {path: 'auth/login', component: AuthLoginComponent},
  {path: 'maps', component: MapsComponent},
>>>>>>> 2f659f80c6d21bb00b2176a0ee7dfaeae7a1a5f2
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES /*, canActivate: [AuthGuardService]*/ },
  // { path: '', component: ContentLayoutComponent, data: { title: 'full Views' }, children: CONTENT_ROUTES /*, canActivate: [AuthGuardService]*/ },
  // { path: '', component: HomepageComponent, data: { title: 'Homepage' }, children: PUBLIC_ROUTES },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
