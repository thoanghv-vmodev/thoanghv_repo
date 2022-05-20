import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/common/product';
import { MessengerService } from '../../service/messenger.service';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @ViewChild('addToCart') addToCart!: ElementRef<HTMLElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;
  @ViewChild('openCart') openCart!: ElementRef<HTMLElement> // tạo tham chiếu tới open bên parent

  listProductAddToCart: Products[] = [];
  cartTotal = 0;
  qty = 1;
  constructor(
    private msg: MessengerService,
  ) {}

  ngOnInit(): void {
    this.getDataMsg();
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listProductAddToCart = JSON.parse(storage)
    }
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  getDataMsg() {
    this.msg.getMsg().subscribe((item: Products) => {
      let data = [];
      data.push({...item, qty: this.qty})
      this.listProductAddToCart = data;
      this.subTotal();
    })
  }

  addProductToCart(product: Products) {
    this.getDataLocalStorage();
    let item = this.listProductAddToCart.find(value => value.id === product.id)
    if(item) {
      item.qty++
    } else {
      this.listProductAddToCart.push(product);
    }
    localStorage.setItem('products', JSON.stringify(this.listProductAddToCart));

    this.subTotal();
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  subTotal() {
    this.cartTotal = 0;
    this.listProductAddToCart.forEach((item: Products) => {
      this.cartTotal += (item.productPrice * item.qty)
    })
  }

  incrementItem(data: Products){
    let item: any = this.listProductAddToCart.find((value: Products) => value.id === data.id)
    item.qty++;
    this.subTotal();
  }

  decrementItem(data: Products){
    let item: any = this.listProductAddToCart.find((value: Products) => value.id === data.id)
    item.qty--;
    if(item.qty <= 0) {
      this.removeItem(item);
    }
    this.subTotal();
  }

  removeItem(data: Products) {
    this.getDataLocalStorage();
    this.listProductAddToCart = this.listProductAddToCart.filter(item => item.id != data.id)
    localStorage.setItem('products', JSON.stringify(this.listProductAddToCart));
    this.closeCart();
  }


  closeCart() {
    this.addToCart.nativeElement.classList.remove('active')
    this.overlay.nativeElement.style.display = 'none';
  }


}
