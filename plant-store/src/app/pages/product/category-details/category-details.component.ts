import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/product';
import { AuthService } from 'src/app/service/auth.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetails implements OnInit {
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
    title: 'Time (old to new)'
  }
  ]
  constructor(
    private route: ActivatedRoute,
    private productService: ProductJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    const type = this.route.snapshot.paramMap.get('type');
    this.productService.getProduct().subscribe(data => {
      if(type) {
        this.currentList = data.filter(el => el.productType === type)
        this.productList = this.currentList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else {
        this.productList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    })
  }

  openAddToCart(data: Products) {
    let userLoggedIn = localStorage.getItem('user')
    if(userLoggedIn) {
      this.msg.sendProductMsg(data)
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
      default:  this.getProductList();
    }
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

}
