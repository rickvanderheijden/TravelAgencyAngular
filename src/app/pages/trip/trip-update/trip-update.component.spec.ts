import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripUpdateComponent } from './trip-update.component';
import {Observable, of} from 'rxjs';
import {Trip} from '../../../../models/trip';
import {TripService} from '../../../services/trip.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

class TestTrip {
  getById(id): Observable<Trip> {
    return of(new Trip);
  }
}

class DummyComponent {
}

describe('TripUpdateComponent', () => {
  let component: TripUpdateComponent;
  let fixture: ComponentFixture<TripUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripUpdateComponent ],
      providers: [{provide: TripService, useValue: new TestTrip()}],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
