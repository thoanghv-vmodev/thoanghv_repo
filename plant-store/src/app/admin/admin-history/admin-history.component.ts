import { Component, OnInit } from '@angular/core';
import { ProductsOrder } from 'src/app/common/product';
import { ModalConfirmService } from 'src/app/service/modal-confirm.service';
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
    private confirmModal: ModalConfirmService
  ) { }
  ngOnInit(): void {
    this.getListHistoryOrder();
  }

  getListHistoryOrder() {
     this.orderService.getProductOrder().subscribe(
      data => {
        this.listDataOrder = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        console.log(this.listDataOrder)
      })
  }

  deleteHistoryOrder(itemDelete: any) {
    this.confirmModal.confirm('Please confirm', 'Do you really want to delete?')
    .then((confirmed) => {
      if(confirmed == true) {
        this.orderService.deleteProductOrder(itemDelete).subscribe(
          item => {
             this.getListHistoryOrder();
           }
         )}
    })
    .catch(() => console.log('User dismissed the dialog'));
  }
}
