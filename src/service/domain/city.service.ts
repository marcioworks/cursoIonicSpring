import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { CityDto } from "../../models/city.dto";

@Injectable()
export class CityService {
  constructor(public http: HttpClient) {}

  findAll(stateId: string): Observable<CityDto> {
    return this.http.get<CityDto>(
      `${API_CONFIG.baseUrl}/state/${stateId}/cities`
    );
  }
}
