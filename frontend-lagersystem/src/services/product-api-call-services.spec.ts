import { TestBed } from '@angular/core/testing';

import { ProductApiCallServices } from './product-api-call-services';

describe('ProductApiCallServices', () => {
  let service: ProductApiCallServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApiCallServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
