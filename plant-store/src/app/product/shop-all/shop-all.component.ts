import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  productList = [
    {
      id: 0,
      prdName: 'ÁDASD',
    },
     {
      id: 1,
      prdName: 'aKAKDS',
    }, {
      id: 2,
      prdName: 'SFSDAF',
    }, {
      id: 3,
      prdName: 'ƯEWDSD',
    }, {
      id: 4,
      prdName: 'SDFSDFD',
    },
  ]

  sub() {
    this.authService.subscribe();
  }

  unsub() {
    this.authService.unSubscribe()
  }

  ngOnInit(): void {

  }


}
