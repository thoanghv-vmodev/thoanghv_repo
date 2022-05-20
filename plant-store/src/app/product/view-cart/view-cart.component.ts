import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/common/product';
import { MessengerService } from 'src/app/service/messenger.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  listProvincesVn = [
    {
    id:1	,
    provin: "An Giang",
    },
    {
    id:2	,
    provin: "Bà Rịa – Vũng Tàu",
    },
    {
    id:3	,
    provin: "Bắc Giang",
    },
    {
    id:4	,
    provin: "Bắc Kạn",
    },
    {
    id:5	,
    provin: "Bạc Liêu",
    },
    {
    id:6	,
    provin: "Bắc Ninh",
    },
    {
    id:7	,
    provin: "Bến Tre",
    },
    {
    id:8	,
    provin: "Bình Định",
    },
    {
    id:9	,
    provin: "Bình Dương",
    },
    {
    id:10,
    provin:"	Bình Phước",
    },
    {
    id:11,
    provin:"	Bình Thuận",
    },
    {
    id:12,
    provin:"	Cà Mau",
    },
    {
    id:13,
    provin:"	Cần Thơ",
    },
    {
    id:14,
    provin:"	Cao Bằng",
    },
    {
    id:15,
    provin:"	Đà Nẵng",
    },
    {
    id:16,
    provin:"	Đắk Lắk",
    },
    {
    id:17,
    provin:"	Đắk Nông",
    },
    {
    id:18,
    provin:"	Điện Biên",
    },
    {
    id:19,
    provin:"	Đồng Nai",
    },
    {
    id:20,
    provin:"	Đồng Tháp",
    },
    {
    id:21,
    provin:"	Gia Lai",
    },
    {
    id:22,
    provin:"	Hà Giang",
    },
    {
    id:23,
    provin:"	Hà Nam",
    },
    {
    id:24,
    provin:"	Hà Nội",
    },
    {
    id:25,
    provin:"	Hà Tĩnh",
    },
    {
    id:26,
    provin:"	Hải Dương",
    },
    {
    id:27,
    provin:"	Hải Phòng",
    },
    {
    id:28,
    provin:"	Hậu Giang",
    },
    {
    id:29,
    provin:"	Hòa Bình",
    },
    {
    id:30,
    provin:"	Hưng Yên",
    },
    {
    id:31,
    provin:"	Khánh Hòa",
    },
    {
    id:32,
    provin:"	Kiên Giang",
    },
    {
    id:33,
    provin:"Kon Tum",
    },
    {
    id:34,
    provin:"Lai Châu",
    },
    {
    id:35,
    provin:"Lâm Đồng",
    },
    {
    id:36,
    provin:"Lạng Sơn",
    },
    {
    id:37,
    provin:"Lào Cai",
    },
    {
    id:38,
    provin:"Long An",
    },
    {
    id:39,
    provin:"Nam Định",
    },
    {
    id:40,
    provin:"Nghệ An",
    },
    {
    id:41,
    provin:"Ninh Bình",
    },
    {
    id:42,
    provin:"Ninh Thuận",
    },
    {
    id:43,
    provin:"Phú Thọ",
    },
    {
    id:44,
    provin:"Phú Yên",
    },
    {
    id:45,
    provin:"Quảng Bình",
    },
    {
    id:46,
    provin:"Quảng Nam",
    },
    {
    id:47,
    provin:"Quảng Ngãi",
    },
    {
    id:48,
    provin:"Quảng Ninh",
    },
    {
    id:49,
    provin:"Quảng Trị",
    },
    {
    id:50,
    provin:"Sóc Trăng",
    },
    {
    id:51,
    provin:"Sơn La",
    },
    {
    id:52,
    provin:"Tây Ninh",
    },
    {
    id:53,
    provin:"Thái Bình",
    },
    {
    id:54,
    provin:"Thái Nguyên",
    },
    {
    id:55,
    provin:"Thanh Hóa",
    },
    {
    id:56,
    provin:"Thừa Thiên Huế",
    },
    {
    id:57,
    provin:"Tiền Giang",
    },
    {
    id:58,
    provin:"TP Hồ Chí Minh",
    },
    {
    id:59,
    provin:"Trà Vinh",
    },
    {
    id:60,
    provin:"Tuyên Quang",
    },
    {
    id:61,
    provin:"Vĩnh Long",
    },
    {
    id:62,
    provin:"Vĩnh Phúc",
    },
    {
    id:63,
    provin:"Yên Bái",
    }
  ]
  constructor(
    private msg: MessengerService,
    private route: ActivatedRoute
  ) {}
  listDataInCart: Products[]= [];
  cartTotal = 0;
  ngOnInit(): void {
    // this.getDataProductMsg();
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    let storage = localStorage.getItem('products');
    if(storage) {
      this.listDataInCart = JSON.parse(storage)
    };
    this.subTotal();
    this.msg.sendItemInCart(this.listDataInCart);
  }

  subTotal() {
    this.cartTotal = 0;
    this.listDataInCart.forEach(item => {
      this.cartTotal += (item.productPrice * item.qty)
    });
  }

  removeItem(data: Products) {
    this.getDataLocalStorage();
    this.listDataInCart = this.listDataInCart.filter(item => item.id != data.id);
    localStorage.setItem('products', JSON.stringify(this.listDataInCart));
    this.msg.sendItemInCart(this.listDataInCart);
  }

  incrementItem(data: Products){
    let item: any = this.listDataInCart.find(value => value.id === data.id);
    item.qty++;
    this.subTotal();
  }

  decrementItem(data: Products){
    let item: any = this.listDataInCart.find(value => value.id === data.id);
    item.qty--;
    if(item.qty <= 0) {
      this.removeItem(item)
    }
    this.subTotal();
  }

  checkOut(){
    console.log(this.listDataInCart);
  }

}
