import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onActive1 = true
  onActive2 = false

  @ViewChild ('item') item: ElementRef<HTMLElement> | undefined;

  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
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


  //Specifying a relative route (đường dẫn tương đối)
  goToItems() {
  this.router.navigate(['succulents'], { relativeTo: this.route });
  }
}
