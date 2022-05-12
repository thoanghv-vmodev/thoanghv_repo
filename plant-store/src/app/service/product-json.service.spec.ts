import { TestBed } from '@angular/core/testing';

import { ProductJsonService } from './product-json.service';

describe('CategoryJsonService', () => {
  let service: ProductJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
