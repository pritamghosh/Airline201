import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FlightProfile } from "src/app/models/flight.profile.model";
@Injectable({
  providedIn: "root"
})
export class ProfileService {
  flightProfileSubject = new Subject<any>();
  localUrl = "assets/fp.json";

  constructor(private http: HttpClient) {}

  showFlightProfile(profileId: number) {
    return this.http
      .get<FlightProfile>(this.localUrl)
      .subscribe((resp: FlightProfile) => {
        this.flightProfileSubject.next(resp);
      });
  }

  getFlightProfile(): Observable<any> {
    return this.flightProfileSubject.asObservable();
  }
}
