import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {}

  findByCategory(category_id) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/product/?categories=${category_id}`
    );
  }

  findById(id: string) {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/product/${id}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucketUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {
      responseType: "blob",
    });
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.baseBucketUrl}/prod${id}.jpg`;
    return this.http.get(url, {
      responseType: "blob",
    });
  }
}
