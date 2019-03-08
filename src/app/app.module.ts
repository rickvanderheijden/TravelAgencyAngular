
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import * as $ from 'jquery';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AuthLoginComponent} from './auth/auth-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './pages/public/homepage/homepage.component';
import { TopFiltersComponent } from './components/top-filters/top-filters.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {CommonModule} from '@angular/common';



export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: ['http://localhost:9000/']
  };
}
@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        AuthLoginComponent,
        HomepageComponent,
        TopFiltersComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        SweetAlert2Module.forRoot(),
        NgbModule.forRoot(),
        JwtModule.forRoot({
          jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtOptionsFactory
          }}),
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
