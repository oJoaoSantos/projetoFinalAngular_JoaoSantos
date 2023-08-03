import { TestBed } from '@angular/core/testing';

import { ServuserService } from './servuser.service';

describe('ServuserService', () => {
  let service: ServuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
