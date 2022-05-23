import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guard/auth-guard.guard';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ShopAllComponent } from '../shop-all/shop-all.component';

const routes: Routes = [

  {
    path: '', component: ShopAllComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id', component: ProductDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-to-cart', component: AddToCartComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListRoutingModule { }
