import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusInput]'
})
export class FocusInputDirective {

  constructor(
    private el: ElementRef
  ) {
    this.el.nativeElement.focus()
  }

}
