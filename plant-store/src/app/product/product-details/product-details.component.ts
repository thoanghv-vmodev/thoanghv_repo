import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/common/product';
import { AuthService } from 'src/app/service/auth.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  currentURL = ''
  productList: Products[] = [];
  itemDetail: Products[] = [];
  url: any = this.router.url;
  itemAddToCart: Products[] = [];
  qty = 1;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductJsonService,
    private router: Router,
    private msg: MessengerService,
    private toastService: ToastService
    ) {}

  ngOnInit(): void {
    this.getItemDetail();
    this.getDataLocalStorage();
  }

  getItemDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct().subscribe(data => {
    this.productList = data;

    let item:any = this.productList.find((el:Products) => el.id == id);
    this.itemDetail.push(item)
  })
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.itemAddToCart = JSON.parse(storage)
    }
    this.msg.sendItemInCart(this.itemAddToCart)
  }

  addProductToCart(product: Products) {
    this.toastService.showAddToCartSuccess()
    this.getDataLocalStorage();
    let item = this.itemAddToCart.find(element => element.id === product.id)
    if(item) {
      item.qty += this.qty
    } else {
      this.itemAddToCart.push({...product, qty: this.qty});
    }
    localStorage.setItem('products', JSON.stringify(this.itemAddToCart));
    this.msg.sendItemInCart(this.itemAddToCart)
  }

  buyProductToCart(product: Products) {
    this.getDataLocalStorage();
    let item = this.itemAddToCart.find(element => element.id === product.id)
    if(item) {
      item.qty += this.qty
    } else {
      this.itemAddToCart.push({...product, qty: this.qty});
    }
    localStorage.setItem('products', JSON.stringify(this.itemAddToCart));
    this.msg.sendItemInCart(this.itemAddToCart);
    this.router.navigate(['cart'])
  }

  incrementItem(){
    if(this.qty != 50) {
      this.qty++;
    }
  }

  decrementItem(){
    if(this.qty != 1) {
      this.qty--;
    }
  }

  detailSlider(data:Products) {
    this.router.navigate(['','product-list','details', data.id]).then(()=>  {window.location.reload();});
  }

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        dots: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true,
        autoplaySpeed: 3000,
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true,
        autoplaySpeed: 3000,
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        dots: true,
        autoplaySpeed: 3000,
      }
    }]
  };
}
