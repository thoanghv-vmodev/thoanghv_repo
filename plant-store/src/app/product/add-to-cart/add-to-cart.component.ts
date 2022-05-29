import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/common/product';
import { ToastService } from 'src/app/service/toast.service';
import { MessengerService } from '../../service/messenger.service';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @ViewChild('addToCart') addToCart!: ElementRef<HTMLElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;
  @ViewChild('openCart') openCart!: ElementRef<HTMLElement>

  listProductAddToCart: Products[] = [];
  cartTotal = 0;
  qty: number = 1;
  constructor(
    private msg: MessengerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getDataMsg();
    this.getDataLocalStorage();
  }


  getDataMsg() {
    this.msg.getMsg().subscribe((item: Products) => {
      let data = [];
      data.push({...item})
      this.listProductAddToCart = data;
      this.subTotal();
    })
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listProductAddToCart = JSON.parse(storage)
    }
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  /**
   * - Chức năng hàm addProductToCart():
   * - Thêm sản phẩm vào giỏi hàng.
   * - Lấy data từ localStorage rồi kiểm tra: nếu id trùng thì sản phẩm cũ tằng lên 1,
   *   nếu không thì thêm 1 sản phẩm mới vào giỏi hàng,
   * - Sau đó lưu data mới vào localStorage
   * @param product
   */
  addProductToCart(product: Products) {
    this.toastService.showAddToCartSuccess();
    this.getDataLocalStorage();
    let item = this.listProductAddToCart.find(value => value.id === product.id)
    if(item) {
      item.qty += this.qty
    } else {
      this.listProductAddToCart.push({...product, qty: this.qty});
    }
    localStorage.setItem('products', JSON.stringify(this.listProductAddToCart));
    this.subTotal();
    this.msg.sendItemInCart(this.listProductAddToCart);
    this.closeCart();
  }

  subTotal() {
    this.cartTotal = 0;
    this.listProductAddToCart.forEach((item: Products) => {
      this.cartTotal += (item.productPrice * this.qty)
    })
  }

  incrementItem(){
    if(this.qty != 50) {
      this.qty++;
      this.subTotal();
    }
  }

  decrementItem(){
    if(this.qty != 1) {
      this.qty--;
      this.subTotal();
    }
  }

  closeCart() {
    this.qty = 1;
    this.addToCart.nativeElement.classList.remove('active')
    this.overlay.nativeElement.style.display = 'none';
  }


}
