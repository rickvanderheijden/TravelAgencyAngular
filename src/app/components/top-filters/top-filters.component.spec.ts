import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiltersComponent } from './top-filters.component';

describe('TopFiltersComponent', () => {
  let component: TopFiltersComponent;
  let fixture: ComponentFixture<TopFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
