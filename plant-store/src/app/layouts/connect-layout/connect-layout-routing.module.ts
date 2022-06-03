import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guard/auth-guard.guard';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { CategoryDetails } from 'src/app/pages/product/category-details/category-details.component';
import { UserCheckOutComponent } from 'src/app/pages/product/user-check-out/user-check-out.component';
import { ViewCartComponent } from 'src/app/pages/product/view-cart/view-cart.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';

const routes: Routes = [
  {
    path: 'home-page', component: HomePageComponent,
  },

  {
    path: 'login', component: LoginComponent,
  },

  {
    path: 'register', component: RegisterComponent,
  },

  {
    path: 'category-details/:type', component: CategoryDetails
  },

  {
    path: 'cart', component: ViewCartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'checkout', component: UserCheckOutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'all-category',
    loadChildren: () => import('../../pages/product/product-list/product-list.module').then(m => m.ProductListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
