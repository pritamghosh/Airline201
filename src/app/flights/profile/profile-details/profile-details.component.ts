import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.sass"]
})
export class ProfileDetailsComponent implements OnInit {
  flightProfileDetailsForm: FormGroup;
  minDate = new Date();
  step = 0;
  depPorts: string[] = ["DEL", "BLR", "BOM"];
  arrPorts: string[] = ["DEL", "BLR", "BOM"];
  cabinConfig: string[] = ["F40/C40/Y100", "Y200", "F40/Y120"];
  filteredDepPorts: Observable<string[]>;
  filteredArrPorts: Observable<string[]>;
  filteredCabinConfig: Observable<string[]>;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.flightProfileDetailsForm = new FormGroup({
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

    this.filteredArrPorts = this.flightProfileDetailsForm
      .get("cabinConfig")
      .valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value, this.arrPorts))
      );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
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

  createLeg(): FormGroup {
    let leg = this.formBuilder.group({
      boardPoint: new FormControl(null, [
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

    this.filteredDepPorts = leg.get("boardPoint").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.depPorts))
    );
    this.filteredArrPorts = leg.get("offPoint").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.arrPorts))
    );
    return leg;
  }
}
