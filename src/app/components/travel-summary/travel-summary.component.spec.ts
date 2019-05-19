import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSummaryComponent } from './travel-summary.component';
import {TripItem} from '../../../models/TripItem';
import {Travel} from '../../../models/travel';

class TestTravel { name = 'Test travel'; totalPrice = 1500; tripItems = new Array<TripItem>(); }

describe('TravelSummaryComponent', () => {
  let component: TravelSummaryComponent;
  let fixture: ComponentFixture<TravelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSummaryComponent);
    component = fixture.componentInstance;
    component.travel = new Travel(new TestTravel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
