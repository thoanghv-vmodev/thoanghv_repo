import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectLayoutRoutingModule } from './connect-layout-routing.module';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { CactiComponent } from 'src/app/product/cacti/cacti.component';
import { CategoryComponent } from 'src/app/product/category/category.component';
import { PlantsComponent } from 'src/app/product/plants/plants.component';
import { SucculentsComponent } from 'src/app/product/succulents/succulents.component';
import { ViewCartComponent } from 'src/app/product/view-cart/view-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCheckOutComponent } from 'src/app/product/user-check-out/user-check-out.component';
import { ShareModule } from 'src/app/share/share-com/share.module';


@NgModule({
  declarations: [
    HomePageComponent,
    CategoryComponent,
    CactiComponent,
    PlantsComponent,
    SucculentsComponent,
    ViewCartComponent,
    UserCheckOutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConnectLayoutRoutingModule,
    ShareModule,
  ],
  providers:[ProductJsonService]
})
export class ConnectLayoutModule { }
