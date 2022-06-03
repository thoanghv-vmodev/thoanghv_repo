import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/product';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {
  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent;

  searchValue!: string;
  searchTerm: string = "";
  isNull = false;
  pagination: number = 1;
  productList: Products[] = [];
  categoryList: Category[] = [];
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
    private productService: ProductJsonService,
    private categoryService: CategoryJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService,
    ) {
    }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  }

  getProductList() {
    this.productService.getProduct().subscribe(
      data => {
      this.productList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
    )
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categoryList = data;
      }
    )
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

  /**
   * Tại sao lại call API:
   * - Vì là real data, data có thể luôn thay đổi theo thời gian,
   * vì vậy phải call api để có thể cập nhật api mới nhất
   * @param event
   * @returns
   */
  filterProductItem(event: any) {
    if(event.target.value != '') {
      this.searchValue = '';
      this.productService.getProduct().subscribe((data :Products[]) => {
        return this.productList = data.filter((value: Products) => value.productType == event.target.value)
      })
    } else {
      return this.getProductList();
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
      default: return this.getProductList();
    }
  }

  openAddToCart(data: Products) {
    let userLoggedIn = localStorage.getItem('user')
    if(userLoggedIn) {
      this.msg.sendProductMsg(data)
      this.openCart.addToCart.nativeElement.classList.add('active');
      this.openCart.overlay.nativeElement.style.display = 'block';
    } else {
      this.router.navigate(['login']);
      this.authService.setCurrentURL(this.currentURL)
    }
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

}
