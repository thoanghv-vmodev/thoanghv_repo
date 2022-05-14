import { TestBed } from '@angular/core/testing';

import { CategoryJsonService } from './category-json.service';

describe('CategoryJsonService', () => {
  let service: CategoryJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
