import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ProfileService } from "../profile.service";

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
  flightProfileIdList = new Set();
  fpSubscription: Subscription;
  filteredDepPorts: Observable<string[]>;
  filteredArrPorts: Observable<string[]>;
  tabs = ["First", "Second", "Third"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  panelOpenState = false;
  reuslts = new MatTableDataSource([
    {
      flightProfileId: 1,
      flight: "AI 123",
      boadrPoint: "DEL",
      offPoint: "BLR",
      arrDate: new Date(),
      depDate: new Date()
    },
    {
      flightProfileId: 12111111111,
      flight: "BA 123",
      boadrPoint: "BOM",
      offPoint: "BLR",
      arrDate: new Date(),
      depDate: new Date()
    }
  ]);
  displayedColumns: string[] = [
    "index",
    "flight",
    "boadrPoint",
    "offPoint",
    "depDate",
    "arrDate"
  ];

  constructor(private profileService: ProfileService) {
    this.minDate.setTime(this.minDate.getTime() - this.minDateOffset);
    this.maxDate.setTime(this.maxDate.getTime() + this.maxDateOffset);
    this.fpSubscription = profileService
      .getFlightProfile()
      .subscribe(flight => this.flightProfileIdList.add(flight));
  }

  ngOnInit(): void {
    this.searchFlightProfileForm = new FormGroup({
      flightNo: new FormControl(null, [
        Validators.pattern("[A-Za-z]{2}[0-9]{0,4}[A-Za-z]{0,1}")
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
  onSelect(flight: any) {
    this.profileService.showFlightProfile(flight);
  }

  onClose(index: number) {
    this.flightProfileIdList.delete(index);
  }
  ngOnDestroy() {
    this.fpSubscription.unsubscribe();
  }
}
