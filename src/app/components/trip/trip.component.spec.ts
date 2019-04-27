import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {JwtModule} from '@auth0/angular-jwt';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Trip} from '../../../models/trip';
import {TripService} from '../../services/trip.service';

class MockTripService {
  getById(): Observable<Array<Trip>> {
    return of(new Array<Trip>());
  }
}

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: TripService, useValue: new MockTripService}],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
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
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    component.tripId = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
