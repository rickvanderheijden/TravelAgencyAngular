import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopFiltersComponent } from './top-filters.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthenticationService} from '../../auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';


describe('TopFiltersComponent', () => {
  let component: TopFiltersComponent;
  let fixture: ComponentFixture<TopFiltersComponent>;
  let authservice: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiltersComponent ],
      providers: [AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        JwtModule.forRoot({
        config: {
          tokenGetter: () => { return 'testtoken'; }
        }})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiltersComponent);
    component = fixture.componentInstance;
    authservice = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should be greater than or equal to 1', () => {
    expect(component.continents.length).toBeGreaterThanOrEqual(1);
  });

  it('should clear all inputs', () => {
    component.clearAll();
    expect(component.continent).toBeNull();
    expect(component.country).toBeNull();
    expect(component.countries.length).toBe(0);
  });
});
