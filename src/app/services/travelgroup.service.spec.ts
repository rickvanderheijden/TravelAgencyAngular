import { TestBed } from '@angular/core/testing';

import { TravelgroupService } from './travelgroup.service';

describe('TravelgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelgroupService = TestBed.get(TravelgroupService);
    expect(service).toBeTruthy();
  });
});
