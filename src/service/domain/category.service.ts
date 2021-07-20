import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoryDto } from "../../models/category.dto";

@Injectable()
export class CategoryService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${API_CONFIG.baseUrl}/category`);
  }
}
