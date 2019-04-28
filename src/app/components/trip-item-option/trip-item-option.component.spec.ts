import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TripItemOptionComponent} from './trip-item-option.component';

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
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
