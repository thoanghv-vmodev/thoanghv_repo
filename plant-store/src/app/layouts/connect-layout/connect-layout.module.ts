import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectLayoutRoutingModule } from './connect-layout-routing.module';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { CategoryComponent } from 'src/app/pages/product/category/category.component';
import { UserCheckOutComponent } from 'src/app/pages/product/user-check-out/user-check-out.component';
import { ViewCartComponent } from 'src/app/pages/product/view-cart/view-cart.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CategoryComponent,
    ViewCartComponent,
    UserCheckOutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule,
    ConnectLayoutRoutingModule,
  ],
  providers:[ProductJsonService]
})
export class ConnectLayoutModule { }
