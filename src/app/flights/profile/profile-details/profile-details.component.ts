import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FlightProfile } from "src/app/models/flight.profile.model";
import { FlightProfileLeg } from "src/app/models/flight.profile.leg.model";
@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.sass"]
})
export class ProfileDetailsComponent implements OnInit {
  flightProfileDetailsForm: FormGroup;
  isCreate: boolean = false;
  @Input() flightProfile: FlightProfile;
  minDate = new Date();
  step = 0;
  depPorts: string[] = ["DEL", "BLR", "BOM"];
  arrPorts: string[] = ["DEL", "BLR", "BOM"];
  cabinConfigs: string[] = ["F40/C40/Y100", "Y200", "F40/Y120"];
  filteredDepPorts: Observable<string[]>;
  filteredArrPorts: Observable<string[]>;
  filteredCabinConfig: Observable<string[]>;
  value: any;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.flightProfile == null) {
      this.isCreate = true;
    }
    this.flightProfileDetailsForm = this.constructFlightProfileForm();
    this.filteredCabinConfig = this.flightProfileDetailsForm
      .get("cabinConfig")
      .valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value, this.cabinConfigs))
      );
  }

  constructFlightProfileForm(): FormGroup {
    let fpFg: FormGroup;
    if (this.flightProfile != null) {
      let fplegs = [];
      for (let index = 0; index < this.flightProfile.legs.length; index++) {
        fplegs.push(this.createLeg(this.flightProfile.legs[index]));
      }
      fpFg = new FormGroup({
        airlineCode: new FormControl(this.flightProfile.airlineCode, [
          Validators.required,
          Validators.pattern("[A-Za-z]{2}")
        ]),
        flightNo: new FormControl(this.flightProfile.flightNo, [
          Validators.required,
          Validators.pattern("[0-9]{0,4}[A-Za-z]{0,1}")
        ]),
        airlcraftType: new FormControl(this.flightProfile.airlcraftType, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),
        airlcraftVersion: new FormControl(this.flightProfile.airlcraftVersion, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),

        cabinConfig: new FormControl(this.flightProfile.cabinConfig, [
          Validators.required
        ]),
        legs: this.formBuilder.array(fplegs)
      });
    } else {
      fpFg = new FormGroup({
        airlineCode: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z]{2}")
        ]),
        flightNo: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9]{0,4}[A-Za-z]{0,1}")
        ]),
        airlcraftType: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),
        airlcraftVersion: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),

        cabinConfig: new FormControl(null, [Validators.required]),
        legs: this.formBuilder.array([this.createLeg()])
      });
    }
    return fpFg;
  }

  createLeg(fpLeg: FlightProfileLeg = null): FormGroup {
    let leg: FormGroup;
    if (fpLeg != null) {
      leg = this.formBuilder.group({
        boardPoint: new FormControl(fpLeg.boardPoint, [
          Validators.required,
          Validators.pattern("[A-Za-z]{3}")
        ]),
        offPoint: new FormControl(fpLeg.offPoint, [
          Validators.required,
          Validators.pattern("[A-Za-z]{3}")
        ]),
        depDate: new FormControl(new Date(fpLeg.depDate), [
          Validators.required
        ]),

        depTime: new FormControl(fpLeg.depTime, [Validators.required]),
        arrDate: new FormControl(new Date(fpLeg.arrDate), [
          Validators.required
        ]),
        arrTime: new FormControl(fpLeg.arrTime, [Validators.required]),
        depTerminal: new FormControl(fpLeg.depTerminal),
        arrTerminal: new FormControl(fpLeg.arrTerminal),
        depGate: new FormControl(fpLeg.depGate),
        arrGate: new FormControl(fpLeg.arrGate)
      });
    } else {
      leg = this.formBuilder.group({
        boardPoint: new FormControl("", [
          Validators.required,
          Validators.pattern("[A-Za-z]{3}")
        ]),
        offPoint: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z]{3}")
        ]),
        depDate: new FormControl(null, [Validators.required]),
        depTime: new FormControl(null, [Validators.required]),
        arrDate: new FormControl(null, [Validators.required]),
        arrTime: new FormControl(null, [Validators.required]),
        depTerminal: new FormControl(null),
        arrTerminal: new FormControl(null),
        depGate: new FormControl(null),
        arrGate: new FormControl(null)
      });
    }

    // this.filteredDepPorts = leg.get("boardPoint").valueChanges.pipe(
    //   startWith(""),
    //   map(value => this._filter(value, this.depPorts))
    // );
    // this.filteredArrPorts = leg.get("offPoint").valueChanges.pipe(
    //   startWith(""),
    //   map(value => this._filter(value, this.arrPorts))
    // );
    return leg;
  }

  private _filter(value: any, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getBoardPointList(index: number) {
    if (
      this.flightProfileDetailsForm.get("legs") != null &&
      this.flightProfileDetailsForm.get("legs")[index] != null
    ) {
      let value = this.flightProfileDetailsForm.get("legs")[index].boardPoint;
      return this.depPorts.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
    }
    return this.depPorts;
  }

  onSubmit() {
    console.log(this.value);

    console.log(this.flightProfileDetailsForm.value);
  }

  get legs(): FormArray {
    return this.flightProfileDetailsForm.get("legs") as FormArray;
  }
  onReset() {
    this.flightProfileDetailsForm.reset();
    for (let index = this.legs.length - 1; index > 0; index--) {
      this.deleteLeg(index);
    }
  }

  nextButtonName(index: number) {
    if (this.legs.length - index === 1) {
      return "Add Leg";
    } else {
      return "Next";
    }
  }

  get submitButtonName() {
    return this.isCreate ? "Create" : "Update";
  }

  get resetButtonName() {
    return this.isCreate ? "Reset" : "Reload";
  }

  deleteLeg(index: number) {
    this.legs.removeAt(index);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.legs.length - this.step === 1) {
      this.legs.push(this.createLeg());
    }
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
