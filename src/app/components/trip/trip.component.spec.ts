import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {JwtModule} from '@auth0/angular-jwt';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
