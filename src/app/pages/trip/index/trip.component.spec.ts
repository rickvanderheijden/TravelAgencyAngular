import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Trip} from '../../../../models/trip';
import {TripService} from '../../../services/trip.service';

class TestTrips {
  getTrips(): Observable<Array<Trip>> {
    return of(new Array<Trip>())
  }
}

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      providers: [{provide: TripService, useValue: new TestTrips()}],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
