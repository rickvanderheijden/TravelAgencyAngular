import { ComponentFixture, TestBed } from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TravelGroup} from '../../../../models/travelGroup';
import {GroupCreateComponent} from './group-create.component';
import {TravelGroupService} from '../../../services/travelgroup.service';

class DummyComponent {
}

class TestGroup {
  createGroup(travelGroup: TravelGroup): Observable<TravelGroup> {
    return of(new TravelGroup);
  }
}


describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCreateComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: TravelGroupService, useValue: new TestGroup()}],
      imports: [ RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent }
        ]),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
