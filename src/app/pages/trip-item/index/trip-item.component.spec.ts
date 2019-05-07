import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TripComponent} from '../../../components/trip/trip.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TripItem} from '../../../../models/TripItem';
import {TripItemService} from '../../../services/trip-item.service';
import {HttpClientModule} from '@angular/common/http';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../../models/trip';

class TestTrips {
  getTripItems(): Observable<Array<TripItem>> {
    return of(new Array<TripItem>())
  }
}

class TestService {
  getById(id): Observable<Array<Trip>> {
    return of(new Array<Trip>())
  }
}

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      providers: [{provide: TripItemService, useValue: new TestTrips()}, {provide: TripService, useValue: new TestService()}],
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
