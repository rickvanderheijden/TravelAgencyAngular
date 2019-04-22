import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripServiceOptionComponent } from './trip-service-option.component';

describe('TripServiceOptionComponent', () => {
  let component: TripServiceOptionComponent;
  let fixture: ComponentFixture<TripServiceOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripServiceOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripServiceOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
