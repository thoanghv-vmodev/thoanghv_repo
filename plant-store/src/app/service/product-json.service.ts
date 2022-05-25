import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Products } from '../common/product';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
@Injectable()
export class ProductJsonService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService
    ) {
  }

  postProduct(obj: Object):Observable<Products> {
    return this.http.post<Products>(`${environment.apiUrl}/product.json`,obj)
    .pipe (
      tap(() => this.toastService.showCreateSuccess())
    )
  }

  getProduct() {
    return this.http.get<{ [id: string]: Products}>(`${environment.apiUrl}/product.json`)
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
    return this.http.put<Products>(`${environment.apiUrl}/product/${id}.json`, data)
    .pipe(
      tap(() => this.toastService.showEditSuccess())
    )
  }

  deleteProduct(data: Products) { // nhan key name
    return this.http.delete<Products>(`${environment.apiUrl}/product/${data.id}.json`)
    .pipe(
      tap(() => this.toastService.showDeleteSuccess())
    )
  }
}
