import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, of } from 'rxjs';
import { delay, map, mapTo, pluck, reduce, scan, toArray } from 'rxjs/operators';
import { Products } from 'src/app/common/product';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalSearchService } from 'src/app/service/list-countries.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-succulents',
  templateUrl: './succulents.component.html',
  styleUrls: ['./succulents.component.scss']
})
export class SucculentsComponent implements OnInit {
  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent;
  productList: Products[] = [];
  currentList: Products[] = [];
  pagination: number = 1;
  currentURL = window.location.href;
  listSortValue = [
  {
    sate: 'hight',
    title: 'Price (hight to low)'
  },
  {
    sate: 'low',
    title: 'Price (low to high)'
  },
  {
    sate: 'new',
    title: 'Time (new to old)'
  },
  {
    sate: 'old',
    title: 'Price (old to new)'
  }
  ]
  constructor(
    private productService: ProductJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService,
    private globalSearch: GlobalSearchService
  ) { }

  ngOnInit(): void {
    this.getListProduct();

    this.globalSearch.searchTerm.subscribe((valueSearch: string) => {
      if(!this.productList || !valueSearch) {
        return this.getListProduct();
      } else{
      return this.productList = this.productList.filter(item =>
        item.productName.toLowerCase().match(valueSearch.toLowerCase()) ||
        item.productPrice.toString().toLowerCase().match(valueSearch.toLowerCase())
      )}
     });
  }

  getListProduct() {
    this.productService.getProduct().subscribe(data => {
      this.currentList = data;
      this.productList = this.currentList.filter((el:any) => el.productType === 'succulents')
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

 sortProductItem(event: any) {
    switch(event.target.value) {
      case 'hight':
         this.productList = this.productList.sort((a, b) => b.productPrice - a.productPrice)
      break;
      case 'low':
           this.productList = this.productList.sort((a, b) => a.productPrice - b.productPrice)
      break;
      case 'new':
           this.productList = this.productList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break;
      case 'old':
           this.productList = this.productList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break;
      default:  this.getListProduct();
    }
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

}
