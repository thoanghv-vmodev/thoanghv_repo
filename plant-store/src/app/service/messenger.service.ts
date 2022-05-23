import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject  } from 'rxjs';
import { Products } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private sendMsgSubject = new Subject<Products>();
  private numOfItem = new BehaviorSubject([])

  constructor(
  ) {}

  sendMsg(product: Products) {
    // console.log(product)
    this.sendMsgSubject.next(product);
  }

  getMsg() {
    return this.sendMsgSubject.asObservable();
  }

  sendItemInCart(number: any){
    this.numOfItem.next(number)
  }

  getItemInCart() {
    return this.numOfItem.asObservable()
  }

}
