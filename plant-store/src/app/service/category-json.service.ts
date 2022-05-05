import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Category } from '../common/category';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
@Injectable()
export class CategoryJsonService {

  constructor(private http: HttpClient) {
  }
  private apiUrl = 'http://localhost:3000/categories';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}`,error)
      return of(result as T)
    }
  }

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategory(): Observable<Category> {
   return this.http.get<Category>(this.apiUrl).pipe(
     delay(300),
     tap(() => console.log('fetched heroes')), // thông báo success
     catchError(
       this.handleError<Category>('getCategory')
       ) // bắt lỗi
   )
  }

  postCategory(obj: Object): Observable<Category> { // obj truyền vào data mới
    return this.http.post<Category>(this.apiUrl, obj, this.httpOptions)
    .pipe(
     tap(() => console.log('create hero')), // thông báo success
     catchError(this.handleError<Category>('postCategory')) // bắt lỗi
   )
  }

  deleteCategory(id: number) { // xóa theo id
    const url = `${this.apiUrl}/${id}`; // tìm id

    return this.http.delete<Category>(url, this.httpOptions).pipe( // xóa data id được truyền vào
      tap(()=>console.log(`delete category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    )
  }

}
