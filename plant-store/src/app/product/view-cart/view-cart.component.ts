import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/common/product';
import { MessengerService } from 'src/app/service/messenger.service';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  @ViewChild ("modalCheckOut") modalCheckOut: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;
  productListInCart: Products[]= [];
  cartTotal: number = 0;
  textNode!: string;
  constructor(
    private msg: MessengerService,
    private router: Router,
    private confirmModal: ModalConfirmService
  ) {}

  ngOnInit(): void {
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      let item = JSON.parse(storage)
      this.productListInCart = item.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    this.subTotal();
    this.msg.sendItemInCart(this.productListInCart);
  }

  subTotal() {
    this.cartTotal = 0;
    this.productListInCart.forEach(item => {
      this.cartTotal += (item.productPrice * item.qty);
    });
  }

  removeItem(data: Products) {
    this.getDataLocalStorage();
    this.productListInCart = this.productListInCart.filter(item => item.id != data.id);
    localStorage.setItem('products', JSON.stringify(this.productListInCart));
    this.msg.sendItemInCart(this.productListInCart);
    this.subTotal();
  }

  incrementItem(data: Products){
    let item: any = this.productListInCart.find(value => value.id === data.id);
    if(item.qty != 10) {
      item.qty++;
      this.subTotal();
    }
  }

  decrementItem(data: Products){
    let item: any = this.productListInCart.find(value => value.id === data.id);
    item.qty--;

    if(item.qty <= 0) {
      item.qty = 1;
      this.confirmModal.confirm('Do you really want to delete product?', `${item.productName}`)
      .then((confirmed) => {
      if(confirmed == true) {
        this.removeItem(item)
      }
      })
      .catch((err) => console.log(err));
    }
   this.subTotal();
  }

  onOrder() {
    localStorage.setItem('productCheckOut', JSON.stringify(this.productListInCart));
    this.router.navigate(['checkout'])
  }
}
