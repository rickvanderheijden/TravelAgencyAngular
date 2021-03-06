import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponent } from './group.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
