import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { ShopAllComponent } from '../shop-all/shop-all.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

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
  ]
})
export class ProductListModule { }
