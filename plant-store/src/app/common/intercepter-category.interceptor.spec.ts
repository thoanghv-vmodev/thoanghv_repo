import { TestBed } from '@angular/core/testing';

import {  CategoryInterceptor } from './intercepter-category.interceptor';

describe('CategoryInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CategoryInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CategoryInterceptor = TestBed.inject(CategoryInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
