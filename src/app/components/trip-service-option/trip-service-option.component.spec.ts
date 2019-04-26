import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripServiceOptionComponent } from './trip-service-option.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Service} from '../../../models/service';

class TestService { imageUrl = 'TestImageUrl'; }

describe('TripServiceOptionComponent', () => {
  let component: TripServiceOptionComponent;
  let fixture: ComponentFixture<TripServiceOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripServiceOptionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripServiceOptionComponent);
    component = fixture.componentInstance;
    component.service = new Service(new TestService());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
