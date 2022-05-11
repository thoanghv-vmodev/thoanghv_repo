import { transition } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @ViewChild('addToCart') addToCart!: ElementRef<HTMLElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  @ViewChild('openCart') openCart!: ElementRef<HTMLElement> // tạo tham chiếu tới open bên parent

  constructor() { }

  ngOnInit(): void {
  }

  closeCart() {
    this.addToCart.nativeElement.classList.remove('active')
    this.overlay.nativeElement.style.display = 'none'
  }


}
