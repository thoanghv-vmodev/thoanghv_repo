import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { ShopAllComponent } from '../shop-all/shop-all.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CategoryJsonService } from 'src/app/service/category-json.service';
import { CategoryInterceptor } from 'src/app/common/intercepter-category.interceptor';

@NgModule({
  declarations: [
    ShopAllComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CategoryJsonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoryInterceptor,
      multi: true
    }
  ]
})
export class ProductListModule { }
