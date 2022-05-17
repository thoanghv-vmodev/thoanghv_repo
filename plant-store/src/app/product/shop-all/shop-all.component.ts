import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/common/category';
import { Products } from 'src/app/common/product';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AuthService } from '../../service/auth-service.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  searchValue!: string;
  isNull = false;
  checked: boolean | undefined;

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child

  constructor(
    private authService: AuthService = new AuthService(),
    private productService: ProductJsonService,
    private categoryService: CategoryJsonService,
    private scroller: ViewportScroller,
    ) {}

  // filter = { cacti: false, succulent: false, plant: false };

  filter = false;

  productList: Products[] = [];
  categoryList: Category[] = [];

  ngOnInit(): void {
    // this.productList = this.authService.getListProduct()
    this.getListProduct();
    this.getListCategory();
  }

  getListProduct() {
    this.productService.getProduct().subscribe(
      data => {
      this.productList = data
      console.log(this.productList)
      }
    )
  }

  getListCategory() {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categoryList = data
        console.log(this.categoryList)
      }
    )
  }

  searchProduct() {
    if(!this.productList || !this.searchValue) {
      this.isNull = false;
      return this.ngOnInit();
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

  /* filterProductItem() {
    if(this.filter = true) {
      return this.productList = this.productList.filter(value =>
        (value.productType === 'cacti' &&  this.filter.cacti) ||
        (value.productType === 'plant' &&  this.filter.plant) ||
        (value.productType === 'succulent' &&  this.filter.succulent)
        )
      }
      else {
        return this.getListProduct()
      }
  } */

  filterProductItem(event: any) {
    console.log(event.target.value)
    if(event.target.checked == true) {
      let itemArray:any = this.productList.filter(value => value.productType == event.target.value)
      this.productList = itemArray
    } else {
      return this.getListProduct();
    }
  }

  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

 /*  sub() {
    this.authService.subscribe();
  }

  unSub() {
    this.authService.unSubscribe()
  } */
}
