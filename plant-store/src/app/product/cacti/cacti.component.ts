import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { fromEvent, observable, Observable, Subscription } from 'rxjs';
import { throttleTime, scan, finalize } from 'rxjs/operators';
import { Products } from 'src/app/common/product';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from '../../service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
@Component({
  selector: 'app-cacti',
  templateUrl: './cacti.component.html',
  styleUrls: ['./cacti.component.scss']
})
export class CactiComponent implements OnInit {

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
    private productService: ProductJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService
  ) { }

  productList: Products[] = [];
  currentList: Products[] = [];

  openAddToCart(data: Products) {
    this.msg.sendMsg(data);

    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }


  ngOnInit(): void {
  this.productService.getProduct().subscribe(data => {
    this.currentList = data;
    this.productList = this.currentList.filter((el:any) => el.productType === 'cacti')
    console.log(this.productList)
   })
  }
}
