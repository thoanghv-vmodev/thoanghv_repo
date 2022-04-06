import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  time: any = new Date;
  money: any = 200000;

  // public num1 : number = 0;
  // public num2 : number = 0;
  // public total : number = 0;
  public isShow: boolean = false;

  @ViewChild('inputFocus',{static: true}) inputFocus: ElementRef<HTMLInputElement> | undefined;

  changes = '';


  toggleMe() {
    this.isShow = !this.isShow
  };

 /*  totalNumber() {
        this.total = this.num1 + this.num2;
    } */
  ngDoCheck() {
    console.log('ngDoCheck: AppComponent')
  }
  ngOnInit() {
    setTimeout(()=>{
      this.inputFocus?.nativeElement.focus()
      console.log('ViewChild - focus')
    },2000)
  }

}
