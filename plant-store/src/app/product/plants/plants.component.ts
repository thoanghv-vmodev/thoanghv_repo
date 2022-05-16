import { Component, OnInit, ViewChild } from '@angular/core';
import {  map } from 'rxjs/operators';
import {  defer, from, fromEvent, fromEventPattern, interval, of, throwError, timer } from 'rxjs';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { ViewportScroller } from '@angular/common';
import { Products } from 'src/app/common/product';
@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
     private productService: ProductJsonService,
     private scroller: ViewportScroller,
  ) { }
  isOn = false;
  productList: Products[] = [];
  currentList: Products[] = [];

  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

  clicked() { this.isOn = !this.isOn; }
  get message() { return `The light is ${this.isOn ? 'On' : 'Off'}`; }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(data => {
      this.currentList = data;
      this.productList = this.currentList.filter((el:any) => el.productType === 'plant')
        console.log(this.productList)
      }
    )


    // Creation Operator

    // of - nhận mọi giá trị và không lặp qua
   /*  of(1, 2, 3)
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`));

    of('hello world').subscribe(this.observer) */

    // from
    // from([1,2,3,4,5]).subscribe(this.observer)

    // from('hello').subscribe(this.observer)

    // khác với of(), from có thể in ra giá trị của Promise, chỉ sử dụng được from với giá trị có thể lặp
    // from(Promise.resolve('helloooooo')).subscribe(this.observer) // cách chính thức để chuyển 1 Promise sang Observable

    // fromEvent
    // fromEvent(document, 'click').subscribe(this.observer)

    //fromEventPattern -> nâng cấp của fromEvent, dùng để xử lý handle phức tạp

    // fromEventPattern(
    //   (handler) => {
    //     document.addEventListener('click', handler)
    //   }, // addHandler
    //   (handler) => {
    //     document.removeEventListener('click', handler)
    //   }// removeHandler
    // ).subscribe(this.observer)

    // function addHandler(handler: any) {
    //    document.addEventListener('click', handler);
    // }

    // function removeHandler(handler: any) {
    //    document.removeEventListener('click', handler);
    // }

    // // output: 10 10
    // fromEventPattern(
    // addHandler,
    // removeHandler,
    // (ev: MouseEvent) => ev.offsetX + ' ' + ev.offsetY
    // ).subscribe(this.observer);

    //interval
    // interval(1000).subscribe(this.observer) - setInterval

    //time -  delay giống setTimeout
    // timer(1000).subscribe(this.observer) // tự động complete

    // timer(1000, 1000).subscribe(this.observer) // delay và chu kỳ

    //throwError -  bắt lỗi và trả về lỗi, dùng trong call api
    // throwError('an error').subscribe(this.observer);

    // defer -  hoãn lại, mỗi lần gọi lại thì sẽ tạo ra một cái mới hoàn toàn
    // const now$ = defer(() => of(Math.random()));
    // // output: 0.27312186273281935
    // now$.subscribe(this.observer);
    // // output: 0.7180321390218474
    // now$.subscribe(this.observer);
    // // output: 0.9626312890837065
    // now$.subscribe(this.observer);
  }

  observer = {
  next: (val:any) => console.log(val),
  error: (err:any) => console.log(err),
  complete: () => console.log('complete'),
  };

}
