import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDescriptionComponent } from './trip-description.component';

describe('TripDescriptionComponent', () => {
  let component: TripDescriptionComponent;
  let fixture: ComponentFixture<TripDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
