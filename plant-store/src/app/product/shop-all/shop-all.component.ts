import { Component, OnInit } from '@angular/core';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { AuthService } from '../../service/auth-service.service';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  constructor(
    private authService: AuthService = new AuthService(),
    private categories: CategoryJsonService
    ) { }

  productList:any = []

  ngOnInit(): void {
    // this.productList = this.authService.getListProduct()
   this.categories.getCategory().subscribe((data) => {
      this.productList = data
      // console.log(this.productList)
    })
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
