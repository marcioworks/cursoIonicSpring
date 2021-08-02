import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { StateDto } from "../../models/state.dto";

@Injectable()
export class StateService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<StateDto> {
    return this.http.get<StateDto>(`${API_CONFIG.baseUrl}/state`);
  }
}
