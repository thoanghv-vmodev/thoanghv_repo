import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject  } from 'rxjs';
import { Products } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private sendProductMsgSubject = new Subject<Products>();
  private numOfItem = new BehaviorSubject([])

  constructor(
  ) {}

  sendProductMsg(product: Products) {
    this.sendProductMsgSubject.next(product);
  }

  getProductMsg() {
    return this.sendProductMsgSubject.asObservable();
  }

  sendItemInCart(number: any){
    this.numOfItem.next(number);
  }

  getItemInCart() {
    return this.numOfItem.asObservable();
  }

}
