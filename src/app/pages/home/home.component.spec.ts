import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TripService} from '../../services/trip.service';
import {Observable, of} from 'rxjs';
import {Trip} from '../../../models/trip';

class MockTripService {
  getTrips(): Observable<Array<Trip>> {
    return of(new Array<Trip>());
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{provide: TripService, useValue: new MockTripService}],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
