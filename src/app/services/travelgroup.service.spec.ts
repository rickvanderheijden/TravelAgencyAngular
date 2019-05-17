import { TestBed } from '@angular/core/testing';

import { TravelGroupService } from './travelgroup.service';

describe('TravelGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelGroupService = TestBed.get(TravelGroupService);
    expect(service).toBeTruthy();
  });
});
