import { Component, OnInit } from '@angular/core';
import { ProductsOrder } from 'src/app/common/models/product';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';
import { OrderListService } from 'src/app/service/order-list.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements OnInit {

  dataOrderList: ProductsOrder[] = [];
  constructor(
    private orderService: OrderListService,
    private modalConfirm: ModalConfirmService
  ) { }
  ngOnInit(): void {
    this.getHistoryOrderList();
  }

  getHistoryOrderList() {
     this.orderService.getProductOrder().subscribe(
      data => {
        this.dataOrderList = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      })
  }

}
