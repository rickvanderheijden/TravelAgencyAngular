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
import {TripItem_ROUTES} from './shared/routes/trip-item-layout.routes';
import {Group_ROUTES} from './shared/routes/group-layout.routes';
import {BookTravel_ROUTES} from './shared/routes/booktravel-layout.routes';
import {Destination_ROUTES} from './shared/routes/destination-layout.routes';
import {Hotel_ROUTES} from './shared/routes/hotel-layout.routes';
import {Profile_ROUTES} from './shared/routes/profile-layout.routes';
import {Booking_ROUTES} from './shared/routes/booking-layout.routes';



const appRoutes: Routes = [
  {
    path: 'auth/login', component: AuthLoginComponent
  },
  {
    path: 'group',
    component: FullLayoutComponent,
    children: Group_ROUTES,
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
    path: 'user-profile',
    component: FullLayoutComponent,
    children: Profile_ROUTES,
    canActivate: [AuthGuardService]
  },
  {
    path: 'trip',
    component: FullLayoutComponent,
    children: Trip_ROUTES,
    canActivate: [AdminGuard]
  },
  {
    path: 'destination',
    component: FullLayoutComponent,
    children: Destination_ROUTES,
    canActivate: [AdminGuard]
  },
  {
    path: 'hotel',
    component: FullLayoutComponent,
    children: Hotel_ROUTES,
    canActivate: [AdminGuard]
  },
  {
    path: 'trip-item',
    component: FullLayoutComponent,
    children: TripItem_ROUTES,
    canActivate: [AdminGuard]
  },
  {
    path: 'booktravel',
    component: FullLayoutComponent,
    children: BookTravel_ROUTES,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookings',
    component: FullLayoutComponent,
    children: Booking_ROUTES,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
