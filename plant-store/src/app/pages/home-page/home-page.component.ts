import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryJsonService } from 'src/app/service/category-json.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
   private categoryService: CategoryJsonService
  ) { }

  categoryName: Category[] = [];
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.categoryName = data
    })
  }
}
