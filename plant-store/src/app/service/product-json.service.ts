import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Products } from '../common/product';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
@Injectable()
export class ProductJsonService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'https://plant-store-b3138-default-rtdb.firebaseio.com/'

  postProduct(obj: Object):Observable<Products> {
    return this.http.post<Products>(`${this.apiUrl}/product.json`,obj)
    .pipe (
      tap(() => alert('Creat success!'))
    )
  }

  getProduct() {
    return this.http.get<{ [id: string]: Products}>(`${this.apiUrl}/product.json`)
    .pipe(
      map(product => {
        let listProduct: Products[] = [];
        for(let id in product) { // lap qua object gan key name = id
          listProduct.push({...product[id], id});
        }
        return listProduct
      })
    )
  }

  putProduct(id: any, data: Products):Observable<Products> { // nhan key name
    return this.http.put<Products>(`${this.apiUrl}/product/${id}.json`, data)
    .pipe(
      tap(() => alert('Edit success!'))
    )
  }

  deleteProduct(data: Products) { // nhan key name
    return this.http.delete<Products>(`${this.apiUrl}/product/${data.id}.json`)
    .pipe(
      tap(() => alert('Delete success!'))
    )
  }
}
