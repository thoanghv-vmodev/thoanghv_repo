import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from 'src/app/my-guard.guard';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ShopAllComponent } from '../shop-all/shop-all.component';

const routes: Routes = [

  {
    path: '', component: ShopAllComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id', component: ProductDetailsComponent,
    pathMatch: 'full',
    canActivate: [MyGuardGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
