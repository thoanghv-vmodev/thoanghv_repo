import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  onActive1 = true
  onActive2 = false
  itemInCart: any = [];
  userInfo: any = [];

  user$ = new Observable<any>();

  @ViewChild ('item') item: ElementRef<HTMLElement> | undefined;
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessengerService,
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

  logout() {
    this.authService.logout()
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

}
