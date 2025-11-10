import { TestBed } from '@angular/core/testing';

import { AdminApiCallServices } from '../services/admin-api-call-services';

describe('AdminApiCallServices', () => {
  let service: AdminApiCallServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApiCallServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
