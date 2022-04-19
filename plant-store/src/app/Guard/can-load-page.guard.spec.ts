import { TestBed } from '@angular/core/testing';

import { CanLoadPageGuard } from './can-load-page.guard';

describe('CanLoadPageGuard', () => {
  let guard: CanLoadPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
