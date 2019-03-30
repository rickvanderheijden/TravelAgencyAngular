import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {MapsComponent} from './maps.component';
import {User} from '../../../models/user';
import {RouterTestingModule} from '@angular/router/testing';
import {HomepageComponent} from '../pages/public/homepage/homepage.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import any = jasmine.any;

@Component({
  template: ''
})
class DummyComponent {
}

describe('MapsComponent', function () {

  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapsComponent, DummyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        RouterTestingModule.withRoutes([
          {path: '', component: DummyComponent}
        ]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'testtoken';
            }
          }
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NgOnInit should made map without destination and origin', () => {
    component.ngOnInit();
    expect(component.origin).toBeUndefined();
    expect(component.destination).toBeUndefined();
    let a;
    a = new Array();
    expect(component.waypoints).toEqual(a);
  });

  it('setDirection should change the destination and origin', () => {
    component.setDirection('Lageburchtweg 3, Uden', 'primera uden');
    expect(component.origin).toBe('Lageburchtweg 3, Uden');
    expect(component.destination).toBe('primera uden');

    component.setDirection(null, null);
    expect(component.origin).toBe(null);
    expect(component.destination).toBe(null);

    component.setDirection({lat: 51.66083, lng: 5.61944}, {lat: 51.6482102, lng: 5.6771949});
    expect(component.origin).toEqual({lat: 51.66083, lng: 5.61944});
    expect(component.destination).toEqual({lat: 51.6482102, lng: 5.6771949});
  });

  it('addWaypoint should add a waypoint to the waypoints array', () => {
    component.addWaypoint('Lageburchtweg 3, Uden', false);
    expect(component.waypoints[component.waypoints.length - 1]).toEqual({location: 'Lageburchtweg 3, Uden', stopover: false});

    expect(component.addWaypoint(null, null)).toBeFalsy();
    expect(component.waypoints[component.waypoints.length - 1]).toEqual({location: null, stopover: null});

    component.addWaypoint({lat: 51.66083, lng: 5.61944}, false);
    expect(component.waypoints[component.waypoints.length - 1]).toEqual({location: {lat: 51.66083, lng: 5.61944}, stopover: false});
  });

});
