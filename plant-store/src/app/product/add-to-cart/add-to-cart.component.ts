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
  qty: number = 1;
  constructor(
    private msg: MessengerService,
  ) {}

  ngOnInit(): void {
    this.getDataMsg();
    this.getDataLocalStorage();
  }


  getDataMsg() {
    this.msg.getMsg().subscribe((item: Products) => { // get item đc truyền vào
      let data = [];
      data.push({...item})
      this.listProductAddToCart = data;
      this.subTotal();
    })
  }

  getDataLocalStorage() { // get data để so sánh
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listProductAddToCart = JSON.parse(storage)
    }
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  addProductToCart(product: Products) {
    this.getDataLocalStorage();
    let item = this.listProductAddToCart.find(value => value.id === product.id)
    if(item) {
      item.qty += this.qty
    } else {
      this.listProductAddToCart.push({...product, qty: this.qty});
    }
    localStorage.setItem('products', JSON.stringify(this.listProductAddToCart));

    this.subTotal();
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  subTotal() {
    this.cartTotal = 0;
    this.listProductAddToCart.forEach((item: Products) => {
      this.cartTotal += (item.productPrice * this.qty)
    })
  }

  incrementItem(){
    this.qty++;
    this.subTotal();
  }

  decrementItem(){
    this.qty--;
    if(this.qty == 0) {
      this.closeCart()
    }
    this.subTotal();
  }

  closeCart() {
    this.qty = 1;
    this.addToCart.nativeElement.classList.remove('active')
    this.overlay.nativeElement.style.display = 'none';
  }


}
