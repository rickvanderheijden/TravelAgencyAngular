import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';
import {UserService} from '../../../services/user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const userService: UserService = new UserService(null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
      .overrideComponent(UserService, {
        set: {
          providers: [
            { provide: UserService, useFactory: () => userService }
          ]
        }
      })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(userService, 'getUsers').and.returnValue(null);
    expect(component).toBeTruthy();
  });
});
