import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  constructor(private authService: AuthService = new AuthService(), private route: ActivatedRoute) { }

  productList:any = []

  ngOnInit(): void {
    this.productList = this.authService.getListProduct()
  }

  sub() {
    this.authService.subscribe();
  }

  unSub() {
    this.authService.unSubscribe()
  }
}


// Test Dependency
// class Animals {
//   constructor(){}
//   run() {
//     console.warn('Animal running')
//   }
// }


// class Human {
//   // speak() {
//   //   console.log('We can speaking')
//   // }
//   run() {
//     console.warn('Animal running')
//   }
// }
// class Cat {
//   public animals: Animals;
//   constructor(animals: Animals) {
//     this.animals = animals;
//   }
// }


// function context() {
//     // const cat = new Cat( new Animals());
//     // cat.animals.run()

//     const A = new Cat (new Human())
//     A.animals.run()
// };

// context();
