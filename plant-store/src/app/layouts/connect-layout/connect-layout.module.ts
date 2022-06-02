import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectLayoutRoutingModule } from './connect-layout-routing.module';
import { ProductJsonService } from 'src/app/service/product-json.service';
import { HomePageComponent } from 'src/app/layouts/connect-layout/home-page/home-page.component';
import { SucculentsComponent } from 'src/app/layouts/connect-layout/product/succulents/succulents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';
import { CactiComponent } from './product/cacti/cacti.component';
import { CategoryComponent } from './product/category/category.component';
import { PlantsComponent } from './product/plants/plants.component';
import { UserCheckOutComponent } from './product/user-check-out/user-check-out.component';
import { ViewCartComponent } from './product/view-cart/view-cart.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CategoryComponent,
    CactiComponent,
    PlantsComponent,
    SucculentsComponent,
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
