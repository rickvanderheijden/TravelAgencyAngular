import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTravelerInformationComponent } from './booking-traveler-information.component';

describe('BookingTravelerInformationComponent', () => {
  let component: BookingTravelerInformationComponent;
  let fixture: ComponentFixture<BookingTravelerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTravelerInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTravelerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
