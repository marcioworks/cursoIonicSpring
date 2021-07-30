import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findByEmail(email: string): Observable<ClientDTO> {
    let token = this.storage.getLocalStorageUser().token;
    let authHeaders = new HttpHeaders({ Authorization: "Bearer " + token });

    return this.http.get<ClientDTO>(
      `${API_CONFIG.baseUrl}/client/email?email=${email}`,
      {
        headers: authHeaders,
      }
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucketUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
}
