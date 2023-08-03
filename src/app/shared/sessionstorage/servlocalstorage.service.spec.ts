import { TestBed } from '@angular/core/testing';

import { ServlocalstorageService } from './servlocalstorage.service';

describe('ServlocalstorageService', () => {
  let service: ServlocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServlocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
