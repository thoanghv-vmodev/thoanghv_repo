import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild ('title1' ,{static: true}) title1: ElementRef<HTMLElement> | undefined;
  @ViewChild ('title2' ,{static: true}) title2: ElementRef<HTMLElement> | undefined;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
        this.title1?.nativeElement.classList.add('active')
        this.title2?.nativeElement.classList.remove('active')
    }, 3000);
    setInterval(() => {
        this.title1?.nativeElement.classList.remove('active')
        this.title2?.nativeElement.classList.add('active')
    }, 6000);
  }

}
