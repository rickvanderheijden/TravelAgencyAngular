
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AuthLoginComponent} from './auth/auth-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TopFiltersComponent } from './components/top-filters/top-filters.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {CommonModule} from '@angular/common';
import {TokenService} from './services/token.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';

import {AgmCoreModule} from '@agm/core';
import { AgmDirectionModule} from 'agm-direction';
import {ToastrModule} from 'ngx-toastr';
import {UserModule} from './pages/user/index/user.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TabsModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import {GroupDetailComponent } from './components/group-detail/group-detail.component';
import {GroupComponent} from './components/group/group.component';
import {ModalModule} from 'ngx-bootstrap';
import { TravelSummaryComponent } from './components/travel-summary/travel-summary.component';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    },
    whitelistedDomains: ['http://localhost:9000/'],
    headerName: 'Authorization',
    authScheme: 'Bearer'
  }
}
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AuthLoginComponent,
    TopFiltersComponent,
    GroupComponent,
    GroupDetailComponent,
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
    Ng2SmartTableModule,
    UserModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_xNfcNGLJdRMi229CJlat9nL-OkPj6d8'
    }),
    AgmDirectionModule,
    FileUploadModule,
  ],
  providers: [
    TokenService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  exports: [
    ModalModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
