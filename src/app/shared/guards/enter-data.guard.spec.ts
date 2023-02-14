import { TestBed } from '@angular/core/testing';

import { EnterDataGuard } from './enter-data.guard';

describe('EnterDataGuard', () => {
  let guard: EnterDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnterDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
