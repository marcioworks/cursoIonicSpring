import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/client/${id}`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/client/email?email=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucketUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(client: ClientDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/client`, client, {
      observe: "response",
      responseType: "text",
    });
  }
}
