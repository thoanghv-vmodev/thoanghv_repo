import { Component, OnInit } from '@angular/core';
import { ProductsOrder } from 'src/app/common/product';
import { OrderListService } from 'src/app/service/order-list.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {

  listDataOrder: ProductsOrder[] = [];
  constructor(
    private orderService: OrderListService,
  ) { }
  ngOnInit(): void {
    this.getListHistoryOrder();
  }

  getListHistoryOrder() {
     this.orderService.getProductOrder().subscribe(
      data => {
        this.listDataOrder = data
        console.log(this.listDataOrder)
      })
  }

  deleteHistoryOrder(data: any) {
    console.log(data)
     if(confirm('Are you sure delete?') == true) {
       this.orderService.deleteProductOrder(data).subscribe(
         itemDelete => {
           this.getListHistoryOrder();
         }
       )
     }
  }
}
