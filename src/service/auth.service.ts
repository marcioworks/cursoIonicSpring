import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../models/credentials.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(public http: HttpClient, public storage: StorageService) {}

  authenticate(credentials: CredentialsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, credentials, {
      observe: "response",
      responseType: "text",
    });
  }

  successfulLogin(Authorization: string) {
    let tok = Authorization.substring(7);

    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub,
    };
    this.storage.setLocalStorageUser(user);
  }

  logOut() {
    this.storage.setLocalStorageUser(null);
  }
}