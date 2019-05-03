import { ComponentFixture, TestBed } from '@angular/core/testing';

import {UserActionButtonsComponent, UserAuthorityComponent, UserComponent} from './user.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';
import {UserService} from '../../../services/user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {User} from '../../../../models/user';

class MockUserService {
  getUsers(): Observable<Array<User>> {
    return of(new Array<User>());
  }
  deleteUser() { return true; }
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: UserService, useValue: new MockUserService}],
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
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRowData {
  authorities = new Array();
}

describe('UserAuthorityComponent', () => {
  let component: UserAuthorityComponent;
  let fixture: ComponentFixture<UserAuthorityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthorityComponent ],
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
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorityComponent);
    component = fixture.componentInstance;
    component.rowData = new MockRowData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRowDataId {
  id = 0;
}

describe('UserActionButtonsComponent', () => {
  let component: UserActionButtonsComponent;
  let fixture: ComponentFixture<UserActionButtonsComponent>;
  let mock: MockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionButtonsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: UserService, useValue: mock}],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
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
    mock = new MockUserService();
    fixture = TestBed.createComponent(UserActionButtonsComponent);
    component = fixture.componentInstance;
    component.rowData = new MockRowDataId;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(mock, 'deleteUser').and.returnValue(true);
    expect(component).toBeTruthy();
  });
});
