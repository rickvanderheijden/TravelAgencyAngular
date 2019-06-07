import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';
import {Observable, of} from 'rxjs';
import {User} from '../../../../models/user';
import {UserService} from '../../../services/user.service';
import {Authority} from '../../../../models/authority';

class MockUserService {
  getAuthorities(): Observable<Array<User>> {
    return of(new Array<User>());
  }
}

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let auth: Array<Authority>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
      providers: [{provide: UserService, useValue: new MockUserService()}],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    auth = new Array<Authority>();
    auth.push(new Authority({id: 1, name: 'TestAuth'}));
    component.authority = new Authority({id: 1, name: 'TestAuth'});
    component.authorities = auth;
    fixture.detectChanges();
  });
});
