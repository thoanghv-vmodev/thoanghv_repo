import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../common/category';
import { CategoryJsonService } from '../service/category-json.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
   private categoryService: CategoryJsonService
  ) { }

  listCategory: Category[] = [];
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.listCategory = data
      // console.log(data)
    })
  }
}
