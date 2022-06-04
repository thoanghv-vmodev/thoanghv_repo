import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  Id: any = '';
  currentURL = window.location.href;
  searchValue!: string;
  isNull = false;
  sortValueList = [
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
    const id = this.route.snapshot.paramMap.get('id');
    this.Id = id;
    if(id) {
    this.productService.getProduct().subscribe(data => {
        this.currentList = data.filter(el => el.productType === id);
        this.productList = this.currentList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.goList();
      })
    }
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

  searchProduct() {
    if(!this.productList || !this.searchValue) {
      this.isNull = false;
      return this.getProductList();
    } else if(this.productList.length <=0) {
      this.isNull = true;
    } else{
      this.productService.getProduct().subscribe((data :Products[]) => {
      return this.productList = data.filter(product =>
      product.productName.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
      product.productPrice.toString().toLocaleUpperCase().match(this.searchValue.toLocaleUpperCase()))
    }),
      this.isNull = false;
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
