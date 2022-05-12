import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Products } from '../common/product';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
@Injectable()
export class ProductJsonService {

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

  getProduct(): Observable<Products> {
   return this.http.get<Products>(this.apiUrl).pipe(
     delay(300),
     tap(() => console.log('fetched heroes')), // thông báo success
     catchError(
       this.handleError<Products>('getProduct')
       ) // bắt lỗi
   )
  }

  postProduct(obj: Object): Observable<Products> { // obj truyền vào data mới
    return this.http.post<Products>(this.apiUrl, obj, this.httpOptions)
    .pipe(
     tap(() => console.log('create hero')), // thông báo success
     catchError(this.handleError<Products>('postProduct')) // bắt lỗi
   )
  }

  deleteProduct(id: number) { // xóa theo id
    const url = `${this.apiUrl}/${id}`; // tìm id

    return this.http.delete<Products>(url, this.httpOptions).pipe( // xóa data id được truyền vào
      tap(()=>console.log(`delete Product id=${id}`)),
      catchError(this.handleError<Products>('deleteProduct'))
    )
  }

}
