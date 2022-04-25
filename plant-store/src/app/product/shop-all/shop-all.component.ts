import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/common/category';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { AuthService } from '../../service/auth-service.service';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  category!:  Category;
  constructor(
    private authService: AuthService = new AuthService(),
    private categories: CategoryJsonService
    ) {
      this.category = new Category();
     }
  @ViewChild ("modal") modal: ElementRef<HTMLElement> | undefined;
  @ViewChild ("overlay") overlay: ElementRef<HTMLElement> | undefined;

  productList:any = []

  ngOnInit(): void {
    // this.productList = this.authService.getListProduct()
   this.categories.getCategory().subscribe(
      data => {
      this.productList = data
      console.log(this.productList)
      }
    )
  }

  sub() {
    this.authService.subscribe();
  }

  unSub() {
    this.authService.unSubscribe()
  }

  openModal() {
    this.modal?.nativeElement.classList.add('dis-block');
    this.overlay?.nativeElement.classList.add('dis-block');
  }

  closeModal() {
    this.modal?.nativeElement.classList.remove('dis-block');
    this.overlay?.nativeElement.classList.remove('dis-block');
  }


  Save(event: any) {
    event.preventDefault();
    this.closeModal();
    this.categories.postCategory(this.category).subscribe(data => {
      console.log(data)
    })
  }

  Delete(data: Category) { // data param
    if(confirm('Bạn chắc chắn muốn xóa') == true) {
      this.productList = this.productList.filter((el:any) => el !== data)
      this.categories.deleteCategory(data.id).subscribe();
    }
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
