import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/common/product';
import { AuthService } from 'src/app/service/auth-service.service';
import { MessengerService } from 'src/app/service/messenger.service';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductJsonService,
    private router: Router,
    private msg: MessengerService
    ) {}
  listProduct: Products[] = [];
  detailsItem: Products[] = [];

  url: any = this.router.url;

  listProductAddToCart: Products[] = [];
  qty = 1;

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  this.getDataLocalStorage();

  this.productService.getProduct().subscribe(data => {
    this.listProduct = data;
    let item: any = this.listProduct.filter((el:any) => el.id == id);
    this.detailsItem = item
  })
}

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listProductAddToCart = JSON.parse(storage)
    }
    this.msg.sendItemInCart(this.listProductAddToCart)
  }

  addProductToCart(product: Products) {
    console.log(this.listProductAddToCart)
    this.getDataLocalStorage();
    let item = this.listProductAddToCart.find(value => value.id === product.id)
    if(item) {
      item.qty++
    } else {
      this.listProductAddToCart.push({...product, qty:this.qty});
    }
    localStorage.setItem('products', JSON.stringify(this.listProductAddToCart));
    this.msg.sendItemInCart(this.listProductAddToCart)
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
