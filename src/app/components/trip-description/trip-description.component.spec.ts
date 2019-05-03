import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDescriptionComponent } from './trip-description.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Trip} from '../../../models/trip';

class TestTrip { name = 'Test trip'; }

describe('TripDescriptionComponent', () => {
  let component: TripDescriptionComponent;
  let fixture: ComponentFixture<TripDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDescriptionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDescriptionComponent);
    component = fixture.componentInstance;
    component.trip = new Trip(new TestTrip);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
