import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { Products } from 'src/app/common/product';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { GlobalSearchService } from 'src/app/service/list-countries.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

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
    title: 'Price (old to new)'
  }
  ]

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child

  constructor(
    private productService: ProductJsonService,
    private categoryService: CategoryJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService,
    private globalSearch: GlobalSearchService
    ) {
    }

  ngOnInit(): void {
    this.getListProduct();
    this.getCategoryList();

    this.globalSearch.searchTerm.subscribe((valueSearch: string) => {
      if(!this.productList || !valueSearch) {
        this.isNull = false;
        return this.getListProduct();
      } else if(this.productList.length <=0) {
        this.isNull = true;
      } else{
      return this.productList = this.productList.filter(item =>
        item.productName.toLowerCase().match(valueSearch.toLowerCase()) ||
        item.productPrice.toString().toLowerCase().match(valueSearch.toLowerCase())
      ),
        this.isNull = false;
      }
     });
  }

  getListProduct() {
    this.productService.getProduct().subscribe(
      data => {
      this.productList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
    )
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categoryList = data
      }
    )
  }

  searchProduct() {
    if(!this.productList || !this.searchValue) {
      this.isNull = false;
      return this.getListProduct();
    } else if(this.productList.length <=0) {
      this.isNull = true;
    } else{
      return this.productList = this.productList.filter(item =>
        item.productName.toLowerCase().match(this.searchValue.toLowerCase()) ||
        item.productPrice.toString().toLowerCase().match(this.searchValue.toLowerCase())
        ),
      this.isNull = false;
    }
  }

  filterProductItem(event: any) {
    // console.log(event.target.value)
    if(event.target.value != '') {
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.filter((value: any) => value.productType == event.target.value)
        })
    } else {
      return this.getListProduct();
    }
  }

  sortProductItem(event: any) {
    switch(event.target.value) {
      case 'hight':
        this.productService.getProduct().subscribe((data :Products[]) => {
            return this.productList = data.sort((a, b) => b.productPrice - a.productPrice)
        })
      break;
      case 'low':
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.sort((a, b) => a.productPrice - b.productPrice)
        })
      break;
      case 'new':
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        })
      break;
      case 'old':
        this.productService.getProduct().subscribe((data :Products[]) => {
          return this.productList = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        })
      break;
      default: return this.getListProduct();
    }
  }

  openAddToCart(data: Products) {
    let userLoggedIn = localStorage.getItem('user')
    if(userLoggedIn) {
      this.msg.sendMsg(data)
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
