import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/product';
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
  productListOnOrder: Products[]= [];
  cartTotal: number = 0;
  textNode!: string;
  constructor(
    private msg: MessengerService,
    private router: Router,
    private confirmModal: ModalConfirmService
  ) {}

  ngOnInit(): void {
    this.getDataLocalStorage();
    this.geProductCheckedOut();
  }

  geProductCheckedOut() {
    this.msg.getProductOnOrder().subscribe((data:any) => {
      // console.log(data)
      this.getDataLocalStorage();
      this.productListInCart = this.productListInCart.filter(item => item.id !== data.id);
      localStorage.setItem('products', JSON.stringify(this.productListInCart));
      this.msg.sendItemInCart(this.productListInCart);
      this.subTotal();
    })
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

  removeItem(data: any) {
    if(data) {
       this.confirmModal.confirm('Do you really want to delete product?', `${data.productName}`)
      .then((confirmed) => {
        if(confirmed == true) {
          this.getDataLocalStorage();
          this.productListInCart = this.productListInCart.filter(item => item.id !== data.id);
          localStorage.setItem('products', JSON.stringify(this.productListInCart));
          this.msg.sendItemInCart(this.productListInCart);
          this.subTotal();
        }
      })
      .catch((err) => console.log(err));
    }
  }

  incrementItem(data: Products){
    let item: any = this.productListInCart.find(value => value.id === data.id);
    if(item.qty) {
      item.qty++;
      this.subTotal();
    }
  }

  decrementItem(data: Products){
    let item: any = this.productListInCart.find(value => value.id === data.id);
    item.qty--;

    if(item.qty < 1) {
      item.qty = 1;
          this.removeItem(item)
    }
   this.subTotal();
  }

  getDataCheck(data: Products) {
    if(data.productChecked === false){
      this.productListOnOrder = this.productListOnOrder.filter(el => el.id !== data.id)
    } else {
      this.productListOnOrder.push(data)
    }
  }

  onOrder() {
    localStorage.setItem('productCheckOut', JSON.stringify(this.productListOnOrder));
    this.router.navigate(['checkout'])
  }
}
