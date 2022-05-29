import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../common/category';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryJsonService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService
    ) { }


  postCategory(obj: Object):Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/category.json`,obj)
    .pipe (
      tap(() => this.toastService.showCreateSuccess())
    )
  }

  getCategory() {
    return this.http.get<{ [id: string]: Category}>(`${environment.apiUrl}/category.json`)
    .pipe(
      map(category => {
        let categoryList: Category[] = [];
        for(let id in category) {
          categoryList.push({...category[id], id});
        }
        return categoryList
      })
    )
  }

  putCategory(id: any, data: Category):Observable<Category> { // key name
    return this.http.put<Category>(`${environment.apiUrl}/category/${id}.json`, data)
    .pipe(
      tap(() => this.toastService.showEditSuccess())
    )
  }

  deleteCategory(data: Category) { //  key name
    return this.http.delete<Category>(`${environment.apiUrl}/category/${data.id}.json`)
    .pipe(
      tap(() => this.toastService.showDeleteSuccess())
    )
  }
}
