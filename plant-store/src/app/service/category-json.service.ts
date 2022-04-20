import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryJsonService {

  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:3000/categories';
  getCategory() {
   return this.http.get<Category>(this.url)
  }

  // getCategoryById(id: any) {
  //   return this.http.get(this.url, id)
  // }

}
