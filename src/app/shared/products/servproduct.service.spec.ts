import { TestBed } from '@angular/core/testing';

import { ServproductService } from './servproduct.service';

describe('ServproductService', () => {
  let service: ServproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
