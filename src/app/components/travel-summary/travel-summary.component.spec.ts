import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSummaryComponent } from './travel-summary.component';
import {TripItem} from '../../../models/TripItem';
import {Travel} from '../../../models/travel';
import {Booking} from '../../../models/booking';
import {Hotel} from '../../../models/hotel';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Trip} from '../../../models/trip';
import {HotelService} from '../../services/hotel.service';

class TestTrip { name = 'Test trip'; imageUrl = 'Image URL'; description = 'Description'; }
class TestTravel { name = 'Test travel'; totalPrice = 1500; trip = new Trip(new TestTrip()); tripItems = new Array<TripItem>(); hotels = new Array<Hotel>() }
class TestBooking { tripItems = Array<TripItem>(); hotels = Array<Hotel>(); };

class MockHotelService {
}

describe('TravelSummaryComponent', () => {
  let component: TravelSummaryComponent;
  let fixture: ComponentFixture<TravelSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSummaryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: HotelService, useValue: new MockHotelService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSummaryComponent);
    component = fixture.componentInstance;
    component.travel = new Travel(new TestTravel());
    component.booking = new Booking(new TestBooking);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
