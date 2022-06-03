import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { MessengerService } from 'src/app/service/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  itemInCart: Products[] = [];
  categoryList: Category[] = [];
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
    private categoryService: CategoryJsonService,
    ) {
      this.user$ = this.authService.getUser() as Observable<User>;
    }

  ngOnInit(): void {
    this.getNumOfProduct();
    this.getDataLocalStorage();
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(data => {
      this.categoryList = data
    })
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

  categoryDetails(data:Category) {
    this.router.navigate(['category-details', data.categoryName]).then(()=>
      {window.location.reload();});
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
