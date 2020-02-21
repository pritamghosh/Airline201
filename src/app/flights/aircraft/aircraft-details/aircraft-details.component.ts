import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from "rxjs";
import { Aircraft } from "src/app/models/aircraft.model";

@Component({
  selector: "app-aircraft-details",
  templateUrl: "./aircraft-details.component.html",
  styleUrls: ["./aircraft-details.component.sass"]
})
export class AircraftDetailsComponent implements OnInit {
  aircraftDetailsForm: FormGroup;
  isCreate: boolean = false;
  @Input() aircraft: Aircraft;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.aircraft == null) {
      this.isCreate = true;
    }
    this.aircraftDetailsForm = this.constructAircraftDetailsForm();
  }

  constructAircraftDetailsForm(): FormGroup {
    let aircraftFg: FormGroup;
    if (this.aircraft != null) {
      let cabinConfigs = [];
      for (let index = 0; index < this.aircraft.cabinConfigs.length; index++) {
        cabinConfigs.push(new FormControl(this.aircraft.cabinConfigs[index]));
      }
      aircraftFg = new FormGroup({
        aircraftId: new FormControl(this.aircraft.aircraftId),
        airlineCode: new FormControl(this.aircraft.airlineCode, [
          Validators.required,
          Validators.pattern("[A-Za-z]{2}")
        ]),
        aircraftTypeCode: new FormControl(this.aircraft.aircraftTypeCode, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),
        airlcraftVersion: new FormControl(this.aircraft.aircraftVersion, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),

        cabinConfigs: this.formBuilder.array(cabinConfigs)
      });
    } else {
      aircraftFg = new FormGroup({
        aircraftId: new FormControl(0),
        airlineCode: new FormControl(null, [
          Validators.required,
          Validators.pattern("[A-Za-z]{2}")
        ]),
        aircraftTypeCode: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),
        airlcraftVersion: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9A-Za-z]{3}")
        ]),

        cabinConfigs: this.formBuilder.array([
          new FormControl(null, [Validators.required])
        ])
      });
    }
    return aircraftFg;
  }

  get submitButtonName() {
    return this.isCreate ? "Create" : "Update";
  }

  get resetButtonName() {
    return this.isCreate ? "Reset" : "Reload";
  }

  onReset() {
    this.aircraftDetailsForm.reset();
  }

  onSubmit() {
    console.log(JSON.stringify(this.aircraftDetailsForm.value));
  }
}
