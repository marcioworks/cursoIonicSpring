import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findByCategory(category_id) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/product/?categories=${category_id}`
    );
  }
}
