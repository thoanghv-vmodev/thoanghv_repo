import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products, ProductsOrder } from 'src/app/common/product';
import { ListCountriesService } from 'src/app/service/list-countries.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { OrderListService } from 'src/app/service/order-list.service';
import { User} from '../../common/user';
import { ProductJsonService } from 'src/app/service/product-json.service';

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

  onOrder() {
    if(this.destination !== '') {
      let date = Date.now()
      let objOrder= {
        userName: this.userCheckOut.userName,
        phoneNumber: this.userCheckOut.phoneNumber,
        itemsOrder: this.listItemCheckOut,
        subTotal: this.cartTotal,
        textNote: this.textNode,
        destination: this.destination,
        date: date
      };

      this.orderService.postProductOrder(objOrder).subscribe(data => {
        console.log(objOrder)
        alert('Order success!')
        localStorage.removeItem('products');
        localStorage.removeItem('productCheckOut');
        this.router.navigateByUrl('/home-page');
        this.msg.sendItemInCart([]);
      })

      } else {
      alert('Please select your destination!')
    }
  }

}
