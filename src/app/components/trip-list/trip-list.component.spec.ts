import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
