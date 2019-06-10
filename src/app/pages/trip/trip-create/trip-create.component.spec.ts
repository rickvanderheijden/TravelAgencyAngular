import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreateComponent } from './trip-create.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Trip} from '../../../../models/trip';
import {Observable, of} from 'rxjs';
import {TripService} from '../../../services/trip.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

class DummyComponent {
}

class TestTrip {
  createTrip(trip: Trip): Observable<Trip> {
    return of(new Trip);
  }
}


describe('TripCreateComponent', () => {
  let component: TripCreateComponent;
  let fixture: ComponentFixture<TripCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCreateComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: TripService, useValue: new TestTrip()}, HttpClient],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent }
        ]),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
