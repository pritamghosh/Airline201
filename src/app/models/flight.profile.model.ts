import { FlightProfileLeg } from "./flight.profile.leg.model";

export class FlightProfile {
  flightProfileId: number;
  airlineCode: string;
  flightNo: string;
  airlcraftType: string;
  airlcraftVersion: string;
  cabinConfig: string;
  legs: FlightProfileLeg[];
}
