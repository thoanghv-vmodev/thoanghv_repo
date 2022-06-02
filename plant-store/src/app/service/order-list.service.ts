import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductsOrder } from '../common/models/product';
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
  }

  getProductOrder() {
    return this.http.get<{ [id: string]: ProductsOrder}>(`${environment.apiUrl}/orders.json`)
    .pipe(
      map(product => {
        let listProduct: ProductsOrder[] = [];
        for(let id in product) {
          listProduct.push({...product[id], id});
        }
        return listProduct
      })
    )
  }

}
