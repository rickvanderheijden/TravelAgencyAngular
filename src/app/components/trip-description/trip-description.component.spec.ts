import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDescriptionComponent } from './trip-description.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Trip} from '../../../models/trip';
import {Travel} from '../../../models/travel';
import {TripItem} from '../../../models/TripItem';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {Destination} from '../../../models/destination';

class TestTrip { name = 'Test trip'; imageUrl = 'Image URL'; description = 'Description'; destinations = new Array<Destination>(); }
class TestTravel { name = 'Test travel'; totalPrice = 1500; tripItems = new Array<TripItem>(); }

describe('TripDescriptionComponent', () => {
  let component: TripDescriptionComponent;
  let fixture: ComponentFixture<TripDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDescriptionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [BsModalService],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return 'testtoken'; }
          }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDescriptionComponent);
    component = fixture.componentInstance;
    component.trip = new Trip(new TestTrip);
    component.travel = new Travel(new TestTravel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
