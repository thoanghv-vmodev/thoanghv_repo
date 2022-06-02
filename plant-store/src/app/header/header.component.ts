import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from '../common/product';
import { User} from '../common/user';
import { AuthService } from '../service/auth.service';
import { GlobalSearchService } from '../service/countries-list.service';
import { MessengerService } from '../service/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onActive1 = true;
  onActive2 = false;
  itemInCart: Products[] = [];
  userInfo: any = [];

  user$ = new Observable<any>();

  @ViewChild ('item') item: ElementRef<HTMLElement> | undefined;
  @ViewChild ('menuMobile') menuMobile: ElementRef<HTMLElement> | undefined;
  @ViewChild ('overlay') overlay!: ElementRef<HTMLElement>;
  constructor(
    private scroller: ViewportScroller,
    private msg: MessengerService,
    private router: Router,
    private authService: AuthService,
    private globalSearch: GlobalSearchService
    ) {
      this.user$ = this.authService.getUser() as Observable<User>;
    }

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
  }

  getDataLocalStorage() {
    let info: any = localStorage.getItem('user');
    if(info) {
      this.userInfo = JSON.parse(info);

      let item: any = localStorage.getItem('products');
      if(item) {
        this.itemInCart = JSON.parse(item);
      }
    }
  }

  onInputSearch(event: any){
     this.globalSearch.searchTerm.next(event.target.value);
  }

  getNumOfProduct() {
    this.msg.getItemInCart().subscribe(data => {
      if(data) {
        this.itemInCart = data;
      }
    })
  }

  onSubmit() {
    this.authService.logout();
    this.router.navigate(['home-page'])
    .then(() => {
      window.location.reload();
    });
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
  }

  goContact() {
    this.scroller.scrollToAnchor("contact");
  }

  openMenuMobile() {
    this.menuMobile?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('overlay-block')
  }

  closeMenuMobile() {
    this.menuMobile?.nativeElement.classList.remove('dis-block');
    this.overlay?.nativeElement.classList.remove('overlay-block')
  }

}
