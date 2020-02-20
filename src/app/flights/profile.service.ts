import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ProfileService {
  flightProfileSubject = new Subject<any>();

  constructor() {}

  showFlightProfile(profileId: number) {
    this.flightProfileSubject.next(profileId);
  }

  getFlightProfile(): Observable<any> {
    return this.flightProfileSubject.asObservable();
  }
}
