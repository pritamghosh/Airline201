import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Aircraft } from "src/app/models/aircraft.model";
@Injectable({
  providedIn: "root"
})
export class AircraftService {
  aircraftSubject = new Subject<any>();
  localUrl = "assets/ac.json";
  constructor(private http: HttpClient) {}

  showAircraft(id: number) {
    return this.http
      .get<Aircraft[]>(this.localUrl)
      .subscribe((resp: Aircraft[]) => {
        resp.forEach(element => {
          console.log(id);

          if (element.aircraftId == id) {
            this.aircraftSubject.next(element);
          }
        });
      });
  }

  getAircraft(): Observable<any> {
    return this.aircraftSubject.asObservable();
  }
}
