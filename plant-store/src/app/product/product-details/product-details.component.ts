import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

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
  itemProduct: any = {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('id', id)

  this.itemProduct = this.authService.getProductById(id)

  // this.route.paramMap.subscribe(params => {
  //   const id = params.get('id')
  //   this.authService.getIndexProduct(id).subscribe(data =>
  //     this.itemProduct = data)
  // })


  // this.productList.forEach((element) => {
  //   if(element.id.toString() == id) {
  //     this.itemProduct = element;
  //   }
  // })

  // for(let data = 0; data < this.productList.length; data++) {
  //   console.log(data)
  //   if(this.productList[data].id.toString() == id) {
  //     this.itemProduct = this.productList[data];
  //     break; // ngăn không cho mỗi lần so sánh thì loop qua tất cả
  //   }
  // }

  // this.itemProduct = this.productList.find(el => el.id.toString() == id)

  }
}
