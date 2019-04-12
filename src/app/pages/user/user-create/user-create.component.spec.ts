import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import {JwtModule} from '@auth0/angular-jwt';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ],
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
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
