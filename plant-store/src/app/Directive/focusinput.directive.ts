import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusinput]'
})
export class FocusinputDirective {

  constructor(
    private el: ElementRef
  ) {
    this.el.nativeElement.focus()
  }

}
