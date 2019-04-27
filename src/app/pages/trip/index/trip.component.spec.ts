import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripComponent ],
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
