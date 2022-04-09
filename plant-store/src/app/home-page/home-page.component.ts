import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //  document.onscroll = () =>{
    //   // console.log(window.scrollY)
    //   console.log(document.documentElement.scrollTop)

    //    }
  }

}
