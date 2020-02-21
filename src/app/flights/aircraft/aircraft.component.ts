import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Aircraft } from "src/app/models/aircraft.model";
import { Subscription } from "rxjs";
import { AircraftService } from "../services/aircraft.service";

@Component({
  selector: "app-aircraft",
  templateUrl: "./aircraft.component.html",
  styleUrls: ["./aircraft.component.sass"]
})
export class AircraftComponent implements OnInit, OnDestroy {
  searchAircraftForm: FormGroup;
  aircraftList = new Array<Aircraft>();
  aircraftSubscription: Subscription;
  selectedTab: number;
  selectedAircraft: number;
  reuslts = new MatTableDataSource([
    {
      aircraftId: 1,
      airlineCode: "AI",
      aircraftTypeCode: "100",
      aircraftVersion: "PKG"
    },
    {
      aircraftId: 2,
      airlineCode: "AI",
      aircraftTypeCode: "300",
      aircraftVersion: "KUL"
    },
    {
      aircraftId: 3,
      airlineCode: "BA",
      aircraftTypeCode: "210",
      aircraftVersion: "PKG"
    }
  ]);

  displayedColumns: string[] = ["radio", "index", "airline", "type", "version"];

  constructor(private aircraftService: AircraftService) {
    this.aircraftSubscription = aircraftService
      .getAircraft()
      .subscribe(aircraft => {
        let activeIndex = -1;
        for (let index = 0; index < this.aircraftList.length; index++) {
          const ac = this.aircraftList[index];
          if (ac.aircraftId === aircraft.aircraftId) {
            activeIndex = index;
            this.selectedTab = activeIndex + 2;
          }
        }
        if (activeIndex == -1) {
          this.aircraftList.push(aircraft);
          this.selectedTab = this.aircraftList.length + 2;
        }
      });
  }

  ngOnInit(): void {
    this.searchAircraftForm = new FormGroup({
      airlineCode: new FormControl(null, [Validators.pattern("[A-Za-z]{2}")]),
      aircraftTypeCode: new FormControl(null, [
        Validators.pattern("[A-Za-z]{3}")
      ]),
      aircraftVersion: new FormControl(null, [
        Validators.pattern("[A-Za-z]{3}")
      ])
    });
  }
  onSubmit() {
    console.log(JSON.stringify(this.searchAircraftForm.value));
  }
  onReset() {
    this.searchAircraftForm.reset();
  }
  openAircraft() {
    this.aircraftService.showAircraft(this.selectedAircraft);
  }

  onClose(index: number) {
    this.aircraftList.splice(index, 1);
  }
  ngOnDestroy() {
    this.aircraftSubscription.unsubscribe();
  }
}
