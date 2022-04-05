import { Component, ContentChild, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-hook',
  templateUrl: './lifecycle-hook.component.html',
  styleUrls: ['./lifecycle-hook.component.scss']
})
export class LifecycleHookComponent implements OnInit {
  // @Input('total') total : number = 0;
  @Input('changes') changes: any;

  @ContentChild('contentView',{static: true})contentView: any;

  constructor() {}

  counter = 0;

  interval: any;


  ngOnInit(): void {
      /* this.interval =  setInterval(()=> {
        this.counter = this.counter + 1;
        console.log(this.counter)
    },800) */
    console.log('ngOnInit: lifecycleHook ')
    console.log('OnInit - ' + this.contentView)
  }

  ngOnDestroy(): void {
   /*  clearInterval(this.interval) */
    console.log('ngOnDestroy: end lifecycleHook')
    console.log('OnDestroy - ' + this.contentView)

  }

  ngOnChanges(changes : SimpleChanges) {
    console.log('ngOnChanges: ',changes);
    console.log('OnChanges - ' + this.contentView)

    }

  ngDoCheck() {
    console.log('ngDoCheck: lifecycleComponent')
    console.log('OnDoCheck - ' + this.contentView)

  }

  ngAfterContentInit() {
    console.log('in After Content init')
    console.log('After Content init - ' + this.contentView)
  }

  ngAfterContentChecked() {
    console.log('in After Content checked')
  }

  ngAfterViewInit() {
    console.log('in After View Init')
  }

  ngAfterViewChecked() {
    console.log('in After View Checked')

  }
}
