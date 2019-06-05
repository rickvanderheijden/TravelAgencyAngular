import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponent } from './group.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TravelGroup} from '../../../../models/travelGroup';
import {TravelGroupService} from '../../../services/travelgroup.service';

class TestGroups {
  getGroups(): Observable<Array<TravelGroup>> {
    return of(new Array<TravelGroup>())
  }
}

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupComponent ],
      providers: [{provide: TravelGroupService, useValue: new TestGroups()}],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
