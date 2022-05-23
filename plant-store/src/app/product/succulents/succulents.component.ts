import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, of } from 'rxjs';
import { delay, map, mapTo, pluck, reduce, scan, toArray } from 'rxjs/operators';
import { Products } from 'src/app/common/product';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-succulents',
  templateUrl: './succulents.component.html',
  styleUrls: ['./succulents.component.scss']
})
export class SucculentsComponent implements OnInit {

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
    private products: ProductJsonService,
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router
  ) { }

  productList: Products[] = [];
  currentList: Products[] = [];

  openAddToCart(data: Products) {
    let userLoggedIn = localStorage.getItem('user')
    if(userLoggedIn) {
      this.msg.sendMsg(data)
      this.openCart.addToCart.nativeElement.classList.add('active');
      this.openCart.overlay.nativeElement.style.display = 'block';
    } else {
      this.router.navigate(['login'])
    }
  }

  goList() {
    this.scroller.scrollToAnchor("product");
  }

  ngOnInit(): void {
    this.products.getProduct().subscribe(data => {
        this.currentList = data;
        this.productList = this.currentList.filter((el:any) => el.productType === 'succulents')
        console.log(this.productList)
        }
      )
    // console.log(this.usersVm)

    // map
    // of(this.users) // data từ parent
    // .pipe(map(data => {
    //     console.log('inside map', data)
    //     return data
    //   })
    // ).subscribe(this.observer)

    //pluck nhổ - hữu dụng để lấy id
    // const param = of({id: 12, foo: { bar: 'Thoang'}});
    // const id = param.pipe(pluck('foo', 'bar')).subscribe(this.observer)

    //mapTo - Phát ra giá trị không đổi đã cho trên đầu ra observable mỗi khi nguồn observable giá trị.

    // merge(
    //   fromEvent(document, 'mouseenter').pipe(mapTo(true)),
    //   fromEvent(document, 'mouseleave').pipe(mapTo(false))
    // ).subscribe(this.observer)

    //reduce - giống reduce array

    // const  totalCount = merge(
    //   of(this.users[0]).pipe(delay(1000)),
    //   of(this.users[1]).pipe(delay(3000))
    // )
    // .pipe(reduce((acc, curr) => acc + curr.postCount,0)).subscribe(this.observer)

    //toArray -  muốn lưu dưới dạng array

    // const  user = merge(
    //   of(this.users[0]).pipe(delay(1000)),
    //   of(this.users[1]).pipe(delay(3000))
    // ).pipe(reduce((acc, curr) => [...acc, curr], [])).subscribe(this.observer)

    // viết tắt bằng toArray
    //  const  user = merge(
    //   of(this.users[0]).pipe(delay(1000)),
    //   of(this.users[1]).pipe(delay(3000))
    // ).pipe(toArray()).subscribe(this.observer)

    // scan - khác với reduce phải chờ parent complete thì mới chạy, scan lấy luôn giá trị vừa thưc hiện xong parent mà
    // không cần đợi parent complete hết func
      // totalCount.pipe(scan((acc, curr) => acc + curr.postCount,0)).subscribe(this.observer)
  }

  // Transformation Operator

  // users = [
  //   {id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662', username: 'thanhtung', firstname: 'phan', lastname: 'tung', postCount: 5},
  //   {id: '34784716-019b-4868-86cd-02287e49c2d3', username: 'vanthoang', firstname: 'hoang', lastname: 'thoang', postCount: 22},
  // ];

  // usersVm = this.users.map(user => { // map cua array
  // return {
  //   ...user,
  //   fullname: `${user.firstname} ${user.lastname}`
  // }
  // });


  // observer = {
  // next: (value: any) => console.log(value),
  // error: (err: any) => console.error(err),
  // complete: () => console.log('completed'),
  // };
}
