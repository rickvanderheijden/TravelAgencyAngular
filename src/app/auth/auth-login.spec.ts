import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthenticationService} from './auth.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthLoginComponent} from './auth-login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import {Observable, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

class MockAuthenticationService {
  login(): Observable<String> {
    return of('token');
  }
}

describe('AuthLoginComponent', function () {

  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authService: MockAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: AuthenticationService, useValue: new MockAuthenticationService}],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    authService = new MockAuthenticationService();
    fixture.detectChanges();
  });

  it('NgOnInit should made the user with empty fields', () => {
    component.ngOnInit();
    expect(component.auth.username).toBeUndefined();
  });

  it('register should set login form to false and register to true', () => {
    component.register();
    expect(component.loginForm).toBeFalsy();
    expect(component.registerForm).toBeTruthy();
  });

  /*
  it('doLogin should call the login method on the authservice', () => {
    // spyOn(authService, 'login').and.returnValue('testtoken');
    // spyOn(component, 'doLogin').and.returnValue('testtoken');
    const token = component.doLogin({username: 'admin', password: 'admin'}, true);
    // @ts-ignore
    expect(token).toBe('testtoken');
  });
  */
});
