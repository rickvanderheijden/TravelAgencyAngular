import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSummaryComponent } from './trip-summary.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Trip} from '../../../models/trip';

class TestTrip { image_url = 'TestImageUrl'; }

describe('TripSummaryComponent', () => {
  let component: TripSummaryComponent;
  let fixture: ComponentFixture<TripSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSummaryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSummaryComponent);
    component = fixture.componentInstance;
    component.trip = new Trip(new TestTrip());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
