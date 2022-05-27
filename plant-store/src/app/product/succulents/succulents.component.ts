import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, of } from 'rxjs';
import { delay, map, mapTo, pluck, reduce, scan, toArray } from 'rxjs/operators';
import { Products } from 'src/app/common/product';
import { AuthService } from 'src/app/service/auth.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-succulents',
  templateUrl: './succulents.component.html',
  styleUrls: ['./succulents.component.scss']
})
export class SucculentsComponent implements OnInit {

  productList: Products[] = [];
  currentList: Products[] = [];
  currentURL = window.location.href;
  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
    private productService: ProductJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getListProduct();
  }

  getListProduct() {
    this.productService.getProduct().subscribe(data => {
      this.currentList = data;
      this.productList = this.currentList.filter((el:any) => el.productType === 'succulents')
      console.log(this.productList)
    })
  }

  openAddToCart(data: Products) {
    let userLoggedIn = localStorage.getItem('user')
    if(userLoggedIn) {
      this.msg.sendMsg(data)
      this.openCart.addToCart.nativeElement.classList.add('active');
      this.openCart.overlay.nativeElement.style.display = 'block';
    } else {
      this.router.navigate(['login'])
      this.authService.setCurrentURL(this.currentURL)
    }
  }

  listSortValue = [
  {
    sate: false,
    title: 'Price (hight to low)'
  },
  {
    sate: true,
    title: 'Price (low to high)'
  }
  ]
sortProductItem(event: any) {
    // console.log(event.target.value)
    if(event.target.value == 'true') { // so sanh string moi chiu!
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.sort((a, b) => a.productPrice - b.productPrice)
        })
    } else if(event.target.value == 'false') {
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.sort((a, b) => b.productPrice - a.productPrice)
        })
    } else {
      return this.getListProduct();
    }
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

}
