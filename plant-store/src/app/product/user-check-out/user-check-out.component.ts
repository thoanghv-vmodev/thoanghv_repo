import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products, ProductsOrder } from 'src/app/common/product';
import { ListCountriesService } from 'src/app/service/list-countries.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { OrderListService } from 'src/app/service/order-list.service';
import { User} from '../../common/user';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-user-check-out',
  templateUrl: './user-check-out.component.html',
  styleUrls: ['./user-check-out.component.scss']
})
export class UserCheckOutComponent implements OnInit {

  constructor(
    private countriesService: ListCountriesService,
    private orderService: OrderListService,
    private router: Router,
    private msg: MessengerService,
    private toastService: ToastService
  ) { }
  cartTotal: number = 0;
  textNode: string = '';
  destination: string = '';
  listItemCheckOut: Products[] = [];
  listCountry: any;
  listDataOrder: ProductsOrder[] = [];
  userCheckOut: any = [];
  putId?: string;


  ngOnInit(): void {
    this.getProductCheckOut();
    this.subTotal();
    this.getListCountry();
    this.getNumOfProduct();

  }

  getNumOfProduct() {
      let storage:any = localStorage.getItem('products')
      let storageItem = JSON.parse(storage).length
      if(storageItem <= 0) {
        localStorage.removeItem('productCheckOut');
      }
  }

  getListCountry() {
    this.listCountry = this.countriesService.getCountryWord()
  }

  getProductCheckOut() {
    let storage = localStorage.getItem('productCheckOut')
    if(storage) {
      this.listItemCheckOut = JSON.parse(storage)
    }
    let user = localStorage.getItem('user');
    if(user) {
      this.userCheckOut = JSON.parse(user);
      // console.log(this.userCheckOut.name)
    }
  }

  subTotal() {
    this.cartTotal = 0;
    this.listItemCheckOut.forEach(item => {
      this.cartTotal += (item.productPrice * item.qty)
    });
  }

  selectCountry(event: any) {
    // console.log(event.target.value)
    this.destination = event.target.value
  }

  // tao mot modal sua thong tin ship hang

  checkOut() {
    if(this.destination !== '') {
      let date = Date.now()
      let objCheckout= {
        userName: this.userCheckOut.userName,
        phoneNumber: this.userCheckOut.phoneNumber,
        itemsOrder: this.listItemCheckOut,
        subTotal: this.cartTotal,
        textNote: this.textNode,
        destination: this.destination,
        date: date
      };
      this.toastService.showCheckoutSuccess();
      setTimeout(() => {
          this.orderService.postProductOrder(objCheckout).subscribe(data => {
            console.log(objCheckout)
            localStorage.removeItem('products');
            localStorage.removeItem('productCheckOut');
            this.router.navigateByUrl('/home-page');
            this.msg.sendItemInCart([]);
          })
      }, 2000);
      } else {
        this.toastService.showErrorDelivery()
    }
  }

}
