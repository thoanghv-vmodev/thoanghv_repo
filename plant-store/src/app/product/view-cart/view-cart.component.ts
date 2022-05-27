import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/common/product';
import { MessengerService } from 'src/app/service/messenger.service';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  constructor(
    private msg: MessengerService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmModal: ModalConfirmService
  ) {}
  @ViewChild ("modalCheckOut") modalCheckOut: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;
  listDataInCart: Products[]= [];
  cartTotal: number = 0;
  textNode!: string;
  ngOnInit(): void {
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listDataInCart = JSON.parse(storage)
    };
    this.subTotal();
    this.msg.sendItemInCart(this.listDataInCart);
  }

  subTotal() {
    this.cartTotal = 0;
    this.listDataInCart.forEach(item => {
      this.cartTotal += (item.productPrice * item.qty)
    });
  }


  removeItem(data: Products) {
    this.getDataLocalStorage();
    this.listDataInCart = this.listDataInCart.filter(item => item.id != data.id);
    localStorage.setItem('products', JSON.stringify(this.listDataInCart));
    this.msg.sendItemInCart(this.listDataInCart);
    this.subTotal();
  }

  incrementItem(data: Products){
    let item: any = this.listDataInCart.find(value => value.id === data.id);
    if(item.qty != 10) {
      item.qty++;
      this.subTotal();
    }
  }

  decrementItem(data: Products){
    let item: any = this.listDataInCart.find(value => value.id === data.id);
    item.qty--;

    if(item.qty <= 0) {
      item.qty = 1;
      this.confirmModal.confirm('Do you really want to delete product?', `${item.productName}`)
      .then((confirmed) => {
      if(confirmed == true) {
        this.removeItem(item)
      }
      }).catch(() => console.log('User dismissed the dialog'));
    }
   this.subTotal();
  }

  onOrder() {
    localStorage.setItem('productCheckOut', JSON.stringify(this.listDataInCart));
    this.router.navigateByUrl('/checkout')
  }
}
