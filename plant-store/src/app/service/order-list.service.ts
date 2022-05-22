import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ProductsOrder } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'https://plant-store-b3138-default-rtdb.firebaseio.com/'

   postProductOrder(obj: Object):Observable<ProductsOrder> {
    return this.http.post<ProductsOrder>(`${this.apiUrl}/orders.json`,obj)
    .pipe (
      tap(() => console.log('Order success!'))
    )
  }

  getProductOrder() {
    return this.http.get<{ [id: string]: ProductsOrder}>(`${this.apiUrl}/orders.json`)
    .pipe(
      map(product => {
        let listProduct: ProductsOrder[] = [];
        for(let id in product) { // lap qua object gan key name = id
          listProduct.push({...product[id], id});
        }
        return listProduct
      })
    )
  }
}
