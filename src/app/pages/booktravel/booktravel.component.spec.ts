import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTravelComponent } from './booktravel.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TripItem} from '../../../models/TripItem';
import {Travel} from '../../../models/travel';

class TestTravel { name = 'Test travel'; totalPrice = 1500; tripItems = new Array<TripItem>(); }

describe('BookTravelComponent', () => {
  let component: BookTravelComponent;
  let fixture: ComponentFixture<BookTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTravelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTravelComponent);
    component = fixture.componentInstance;
    component.travel = new Travel(new TestTravel);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
