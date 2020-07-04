import { TestBed, async, inject } from '@angular/core/testing';

import { SecurePageGuard } from './secure-page.guard';

describe('SecurePageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurePageGuard]
    });
  });

  it('should ...', inject([SecurePageGuard], (guard: SecurePageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
