import { TestBed } from '@angular/core/testing';

import { CustomerApiCallServices } from '../services/customer-api-call-services';

describe('CustomerApiCallServices', () => {
  let service: CustomerApiCallServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApiCallServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
