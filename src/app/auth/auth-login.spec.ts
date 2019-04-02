import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthenticationService} from './auth.service';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthLoginComponent} from './auth-login.component';
import {User} from '../../models/user';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
@Component({
  template: ''
})
class DummyComponent {
}

describe('AuthLoginComponent', function () {

  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authservice: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLoginComponent, DummyComponent ],
      providers: [AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent }
        ]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    authservice = TestBed.get(AuthenticationService);
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

  it('doLogin should call the login method on the authservice', () => {
    spyOn(authservice, 'login').and.returnValue('testtoken');
    spyOn(component, 'doLogin').and.returnValue('testtoken');
    const token = component.doLogin({username: 'Admind', password: 'Admin'}, true);
    // @ts-ignore
    expect(token).toBe('testtoken');
  });

});
