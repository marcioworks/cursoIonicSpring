import { CityDto } from "./city.dto";

export interface AddressDTO {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  zipcode: string;
  city: CityDto;
}
