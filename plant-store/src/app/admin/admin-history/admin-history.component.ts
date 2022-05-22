import { Component, OnInit } from '@angular/core';
import { ProductsOrder } from 'src/app/common/product';
import { OrderListService } from 'src/app/service/order-list.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {

  constructor(
    private orderService: OrderListService
  ) { }
  listDataOrder: ProductsOrder[] = [];
  ngOnInit(): void {

    this.orderService.getProductOrder().subscribe(
      data => {
        this.listDataOrder = data
        console.log(this.listDataOrder)
      })
  }
}
