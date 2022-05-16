import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plant-store';
  isShow!: boolean;

  showBtnScroll = 1000;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset ||
    document.documentElement.scrollTop || document.body.scrollTop || 0
    // console.log(scrollPosition)
    if(scrollPosition >= this.showBtnScroll) {
      this.isShow = true
    } else {
      this.isShow = false
    }
  }

 gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
