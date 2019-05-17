import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTravelComponent } from './booktravel.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

describe('BookTravelComponent', () => {
  let component: BookTravelComponent;
  let fixture: ComponentFixture<BookTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTravelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
