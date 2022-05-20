import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../common/product';
import { AddToCartComponent } from '../product/add-to-cart/add-to-cart.component';
import { MessengerService } from '../service/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onActive1 = true
  onActive2 = false
  itemInCart: any;

  @ViewChild ('item') item: ElementRef<HTMLElement> | undefined;
  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent;
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessengerService
    ) { }

  ngOnInit(): void {
    setInterval(() => {
        this.onActive1 = true
        this.onActive2 = false
    }, 3000);
    setInterval(() => {
        this.onActive1 = false
        this.onActive2 = true
    }, 6000);
    this.getNumOfProduct()
    let a: any = localStorage.getItem('products')
    this.itemInCart = JSON.parse(a)
  }

   getNumOfProduct() {
    this.msg.getItemInCart().subscribe(data => {
      this.itemInCart = data;
      // console.log(this.itemInCart)
    })
  }

  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
  }

  onFocus() {
    this.item?.nativeElement.classList.add('border-box')
  }

  onBlur() {
    this.item?.nativeElement.classList.remove('border-box')
  }

  goTop() {
    this.scroller.scrollToAnchor("top");
  }

  goAbout() {
    this.scroller.scrollToAnchor("about");
    this.router.navigateByUrl('/home-page')
  }

  goContact() {
    this.scroller.scrollToAnchor("contact");
  }

  Enter() {
    this.router.navigateByUrl('/search-result')
  }

}
