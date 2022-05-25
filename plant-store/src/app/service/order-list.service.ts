import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductsOrder } from '../common/product';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  postProductOrder(obj: Object):Observable<ProductsOrder> {
    return this.http.post<ProductsOrder>(`${environment.apiUrl}/orders.json`,obj)
    .pipe (
      tap(() => console.log('Order success!'))
    )
  }

  getProductOrder() {
    return this.http.get<{ [id: string]: ProductsOrder}>(`${environment.apiUrl}/orders.json`)
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

  deleteProductOrder(data: ProductsOrder) {
    return this.http.delete<ProductsOrder>(`${environment.apiUrl}/orders/${data.id}.json`)
    .pipe(
      tap(() => this.toastService.showDeleteSuccess())
    )
  }
}
