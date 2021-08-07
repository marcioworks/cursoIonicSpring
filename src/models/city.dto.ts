import { StateDto } from "./state.dto";

export interface CityDto {
  id: string;
  name: string;
  state?: StateDto;
}
