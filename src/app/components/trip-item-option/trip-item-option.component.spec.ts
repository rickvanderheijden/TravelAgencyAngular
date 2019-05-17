import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TripItemOptionComponent} from './trip-item-option.component';
import {TripItem} from '../../../models/TripItem';

class TestTripItem { name = 'TestTripItem'; imageUrl = 'Image URL'; description = 'Description'; }

describe('TripItemOptionComponent', () => {
  let component: TripItemOptionComponent;
  let fixture: ComponentFixture<TripItemOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripItemOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripItemOptionComponent);
    component = fixture.componentInstance;
    component.tripItem = new TripItem(new TestTripItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
