import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../common/product';
import { User} from '../common/user';
import { AccountService } from '../service/account.service';
import { MessengerService } from '../service/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onActive1 = true
  onActive2 = false
  itemInCart = 0;
  userInfo: any = [];
  Account: any = [];
  isAccount = false

  @ViewChild ('item') item: ElementRef<HTMLElement> | undefined;
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessengerService,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    setInterval(() => {
        this.onActive1 = true
        this.onActive2 = false
    }, 3000);
    setInterval(() => {
        this.onActive1 = false
        this.onActive2 = true
    }, 6000);

    this.getNumOfProduct();
    this.getDataLocalStorage();
    this.getListAccount();
  }

  getListAccount() {
    this.accountService.getAccount().subscribe(
      (data: any) => {
        if(data) {
          this.Account = data.find((el: any) => el.id === this.userInfo.id);
          console.log(this.Account);
        }
      }, err => {
        alert('Something went wrong!! ');
      })
  }

  getDataLocalStorage() {
    let item: any = localStorage.getItem('products');
    if(item) {
      this.itemInCart = JSON.parse(item).length;
    }

    let info: any = localStorage.getItem('user');
    if(info) {
      this.userInfo = JSON.parse(info);
      this.isAccount = true;
    }
  }

  getNumOfProduct() {
    this.msg.getItemInCart().subscribe(data => {
      if(data) {
        this.itemInCart = data.length;
      }
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.isAccount = false;
  }

  onFocus() {
    this.item?.nativeElement.classList.add('border-box')
  }

  onBlur() {
    this.item?.nativeElement.classList.remove('border-box')
  }

  goTop() {
    this.scroller.scrollToAnchor("top");
  }

  goAbout() {
    this.scroller.scrollToAnchor("about");
    this.router.navigateByUrl('/home-page')
  }

  goContact() {
    this.scroller.scrollToAnchor("contact");
  }

  Enter() {
    this.router.navigateByUrl('/search-result')
  }

}
