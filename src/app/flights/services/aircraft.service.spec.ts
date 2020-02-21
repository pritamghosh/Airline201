import { TestBed } from "@angular/core/testing";

import { AircraftService } from "./aircraft.service";

describe("AircaftService", () => {
  let service: AircraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
