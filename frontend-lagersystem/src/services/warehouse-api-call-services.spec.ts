import { TestBed } from '@angular/core/testing';

import { WarehouseApiCallServices } from './warehouse-api-call-services';

describe('WarehouseApiCallServices', () => {
  let service: WarehouseApiCallServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseApiCallServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
