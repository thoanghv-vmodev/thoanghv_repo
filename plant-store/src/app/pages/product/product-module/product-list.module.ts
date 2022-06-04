import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { ShopAllComponent } from '../shop-all/shop-all.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareModule } from 'src/app/share/share.module';
import { CategoryDetails } from '../category-details/category-details.component';

@NgModule({
  declarations: [
    ShopAllComponent,
    ProductDetailsComponent,
    CategoryDetails,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    HttpClientModule,
    ShareModule,
    FormsModule,
    SlickCarouselModule,

  ],
  providers: [
    ProductJsonService,
  ]
})
export class ProductListModule { }
