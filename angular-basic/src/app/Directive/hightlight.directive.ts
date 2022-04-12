import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AppAutoFocus {

  constructor(
    private el: ElementRef
  ) {
    this.el.nativeElement.style.outline = 'none'
    this.el.nativeElement.style.border = '1px solid red'
    this.el.nativeElement.focus()
  }

}
