import { TestBed } from "@angular/core/testing";

import { LeaveEditingGuard } from "./leave-editing.guard";

describe("LeaveEditingGuard", () => {
  let guard: LeaveEditingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveEditingGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
