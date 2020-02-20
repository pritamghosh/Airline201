import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ProfileService } from "../profile.service";
import { FlightProfile } from "src/app/models/flight.profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  minDate = new Date();
  maxDate = new Date();
  minDateOffset = 24 * 60 * 60 * 1000 * 30 * 6; //6 Monthes
  maxDateOffset = 24 * 60 * 60 * 1000 * 30 * 12; //12 Monthes
  searchFlightProfileForm: FormGroup;
  depPorts: string[] = ["DEL", "BLR", "BOM"];
  arrPorts: string[] = ["DEL", "BLR", "BOM"];
  flightProfileList = new Array<FlightProfile>();
  fpSubscription: Subscription;
  filteredDepPorts: Observable<string[]>;
  filteredArrPorts: Observable<string[]>;
  selectedTab: number;
  selectedFlight: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  panelOpenState = false;
  reuslts = new MatTableDataSource([
    {
      flightProfileId: 1,
      airlineCode: "AI",
      flightNo: "123",
      boadrPoint: "DEL",
      offPoint: "BLR",
      arrDate: new Date(),
      depTime: "10:31",
      arrTime: "12:00",
      depDate: new Date()
    },
    {
      flightProfileId: 2,
      airlineCode: "BA",
      flightNo: "123",
      boadrPoint: "BOM",
      offPoint: "BLR",
      arrDate: new Date(),
      depTime: "20:31",
      arrTime: "22:00",
      depDate: new Date()
    }
  ]);
  displayedColumns: string[] = [
    "radio",
    "index",
    "flight",
    "boadrPoint",
    "offPoint",
    "depDate",
    "depTime",
    "arrDate",
    "arrTime"
  ];

  constructor(private profileService: ProfileService) {
    this.minDate.setTime(this.minDate.getTime() - this.minDateOffset);
    this.maxDate.setTime(this.maxDate.getTime() + this.maxDateOffset);
    this.fpSubscription = profileService
      .getFlightProfile()
      .subscribe(flight => {
        let activeIndex = -1;
        for (let index = 0; index < this.flightProfileList.length; index++) {
          const fp = this.flightProfileList[index];
          if (fp.flightProfileId === flight.flightProfileId) {
            activeIndex = index;
            this.selectedTab = activeIndex + 2;
          }
        }
        if (activeIndex == -1) {
          this.flightProfileList.push(flight);
          this.selectedTab = this.flightProfileList.length + 2;
        }
      });
  }

  ngOnInit(): void {
    this.searchFlightProfileForm = new FormGroup({
      airlineCode: new FormControl(null, [Validators.pattern("[A-Za-z]{2}")]),
      flightNo: new FormControl(null, [
        Validators.pattern("[0-9]{0,4}[A-Za-z]{0,1}")
      ]),
      formDate: new FormControl(new Date(), [Validators.required]),
      toDate: new FormControl(),
      depPort: new FormControl(null, [
        Validators.required,
        Validators.pattern("[A-Za-z]{3}")
      ]),
      arrPort: new FormControl(null, [Validators.pattern("[A-Za-z]{3}")])
    });

    this.filteredDepPorts = this.searchFlightProfileForm
      .get("depPort")
      .valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value, this.depPorts))
      );
    this.filteredArrPorts = this.searchFlightProfileForm
      .get("arrPort")
      .valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value, this.arrPorts))
      );
    this.reuslts.sort = this.sort;
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSubmit() {
    console.log(this.searchFlightProfileForm.value);
  }
  onReset() {
    this.searchFlightProfileForm.reset();
  }

  openFlight() {
    console.log(this.selectedFlight);

    this.profileService.showFlightProfile(this.selectedFlight);
  }

  assignFlight() {
    this.profileService.showFlightProfile(this.selectedFlight);
  }

  onClose(index: number) {
    this.flightProfileList.splice(index, 1);
  }
  ngOnDestroy() {
    this.fpSubscription.unsubscribe();
  }
}
