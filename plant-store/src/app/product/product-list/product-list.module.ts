import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { ShopAllComponent } from '../shop-all/shop-all.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { AuthInterceptor } from 'src/app/common/auth.interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareComModule } from 'src/app/share/share-com/share-com.module';

@NgModule({
  declarations: [
    ShopAllComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    ShareComModule

  ],
  providers: [
    ProductJsonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class ProductListModule { }
