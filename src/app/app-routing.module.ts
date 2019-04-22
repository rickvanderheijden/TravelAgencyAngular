import { NgModule } from '@angular/core';
import {RouterModule, PreloadAllModules, Routes} from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import {AuthLoginComponent} from './auth/auth-login.component';
import {AuthGuardService} from './auth/auth.guard';
import {AdminGuard} from './services/admin.guard';

// Routes
import {User_ROUTES} from './shared/routes/user-layout.routes';
import {Home_ROUTES} from './shared/routes/home-layout.routes';
import {Trip_ROUTES} from './shared/routes/trip-layout.routes';





const appRoutes: Routes = [
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: Home_ROUTES,
  },
  {
    path: 'user',
    component: FullLayoutComponent,
    children: User_ROUTES,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trip',
    component: FullLayoutComponent,
    children: Trip_ROUTES,
    // canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
