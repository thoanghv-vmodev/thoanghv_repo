import { Component, OnInit } from '@angular/core';
import { fromEvent, observable, Observable, Subscription } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
@Component({
  selector: 'app-cacti',
  templateUrl: './cacti.component.html',
  styleUrls: ['./cacti.component.scss']
})
export class CactiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  // vd của a tiệp
      /* fromEvent(document, 'mousemove').pipe(
      throttleTime(1000)
    ).subscribe(console.log) */

    /* setTimeout(() => {
    this.subscription.unsubscribe()
  }, 5000); */

  //vd cuả Rxjs

  // console.log('just before subscribe');
  // this.observable.subscribe({
  // next(x) { console.log('got value ' + x); },
  // error(err) { console.error('something wrong occurred: ' + err); },
  // complete() { console.log('done'); }
  // });
  // console.log('just after subscribe');

  // observable.subscribe(this.observer)

}

  //Vd của a Tiệp
/*   observable = new Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('Hello Rxjs');
    observer.complete();
  }, 1000);

  return function unsubscribe() {
    clearInterval(id);
  }
  });

  subscription =  this.observable.subscribe({
    next: (value) =>{
        console.log(value);
    },
    error: (err) => {
      console.log(err)
    },
    complete: () => {console.log('comptete')}
  }) */

  // vd của Rxjs

  // observable = new Observable(subscriber => {
  // subscriber.next(1);
  // subscriber.next(2);
  // subscriber.next(3);
  // setTimeout(() => {
  //   subscriber.next(4);
  //   subscriber.complete();
  // }, 1000);
  // });

  observer = {
  next: (x:any) => console.log('Observer got a next value: ' + x),
  error: (err:any )=> console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
  };

}
