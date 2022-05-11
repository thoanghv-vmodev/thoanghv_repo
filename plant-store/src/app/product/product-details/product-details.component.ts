import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild(AddToCartComponent) openCart!: AddToCartComponent; // view đến component child
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private categoryService: CategoryJsonService
    ) {}

/*   productList = [
    {
      id: 0,
      prdName: 'ÁDASD',
      price: 1222
    },
     {
      id: 1,
      prdName: 'aKAKDS',
      price: 99999
    },
    {
      id: 2,
      prdName: 'SFSDAF',
      price: 5349503
    },
    {
      id: 3,
      prdName: 'ƯEWDSD',
      price: 34434522222
    },
    {
      id: 4,
      prdName: 'SDFSDFD',
      price: 332323232
    },

  ]
 */
  listData: any = [];
  listItem: any = [];
  listProduct: any = [];

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  // console.log('id', id);

  // this.itemProduct = this.authService.getProductById(id)

  this.categoryService.getCategory().subscribe(data => {
    this.listData = data;
    this.listItem = this.listData.find((el:any) => el.id == id);
    console.log(this.listItem)
  }
  )

  this.categoryService.getCategory().subscribe(data => {
    this.listProduct = data;
  })

 /*  this.route.paramMap.subscribe(params => {
    const id = params.get('id')
    this.authService.getIndexProduct(id).subscribe(data =>
      this.itemProduct = data)
  })


  this.productList.forEach((element) => {
    if(element.id.toString() == id) {
      this.itemProduct = element;
    }
  })

  for(let data = 0; data < this.productList.length; data++) {
    console.log(data)
    if(this.productList[data].id.toString() == id) {
      this.itemProduct = this.productList[data];
      break; // ngăn không cho mỗi lần so sánh thì loop qua tất cả
    }
  }

  this.itemProduct = this.productList.find(el => el.id.toString() == id)
 */

  }

  openAddToCart() {
    this.openCart.addToCart.nativeElement.classList.add('active');
    this.openCart.overlay.nativeElement.style.display = 'block';
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
