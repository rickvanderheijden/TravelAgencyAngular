import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TripCreateComponent} from '../../trip/trip-create/trip-create.component';

describe('TripCreateComponent', () => {
  let component: TripCreateComponent;
  let fixture: ComponentFixture<TripCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
