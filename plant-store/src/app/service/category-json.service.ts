import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryJsonService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://plant-store-b3138-default-rtdb.firebaseio.com/'

  postCategory(obj: Object):Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/category.json`,obj)
    .pipe (
      tap(() => alert('Creat success!'))
    )
  }

  getCategory() {
    return this.http.get<{ [id: string]: Category}>(`${this.apiUrl}/category.json`)
    .pipe(
      map(category => {
        let listCategory: Category[] = [];
        for(let id in category) { // lap qua object gan key name = id
          listCategory.push({...category[id], id}); // convert id
        }
        return listCategory
      })
    )
  }

  putCategory(id: any, data: Category):Observable<Category> { // nhan key name
    return this.http.put<Category>(`${this.apiUrl}/category/${id}.json`, data)
    .pipe(
      tap(() => alert('Edit success!'))
    )
  }

  deleteCategory(data: Category) { // nhan key name
    return this.http.delete<Category>(`${this.apiUrl}/category/${data.id}.json`)
    .pipe(
      tap(() => alert('Delete success!'))
    )
  }
}
