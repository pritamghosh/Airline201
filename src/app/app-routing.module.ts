import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AircraftComponent } from "./flights/aircraft/aircraft.component";
import { ProfileComponent } from "./flights/profile/profile.component";
import { MsmComponent } from "./flights/msm/msm.component";
import { PassengersComponent } from "./passengers/passengers.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const routes: Routes = [
  {
    path: "flights",
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "aircraft", component: AircraftComponent },
      { path: "msm", component: MsmComponent }
    ]
  },
  { path: "passengers", component: PassengersComponent },
  {
    path: "",
    component: LandingPageComponent
  },
  { path: "*x", component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
