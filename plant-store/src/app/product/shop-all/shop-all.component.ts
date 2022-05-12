import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/common/product';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AuthService } from '../../service/auth-service.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  product!:  Products;

  constructor(
    private authService: AuthService = new AuthService(),
    private products: ProductJsonService,
    private scroller: ViewportScroller,
    ) {
      this.product = new Products();
     }


  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child

  productList:any = []

  ngOnInit(): void {
    // this.productList = this.authService.getListProduct()
   this.products.getProduct().subscribe(
      data => {
      this.productList = data
      console.log(this.productList)
      }
    )
  }

  sub() {
    this.authService.subscribe();
  }

  unSub() {
    this.authService.unSubscribe()
  }


  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

}


// Test Dependency
// class Animals {
//   constructor(){}
//   run() {
//     console.warn('Animal running')
//   }
// }


// class Human {
//   // speak() {
//   //   console.log('We can speaking')
//   // }
//   run() {
//     console.warn('Animal running')
//   }
// }
// class Cat {
//   public animals: Animals;
//   constructor(animals: Animals) {
//     this.animals = animals;
//   }
// }


// function context() {
//     // const cat = new Cat( new Animals());
//     // cat.animals.run()

//     const A = new Cat (new Human())
//     A.animals.run()
// };

// context();
