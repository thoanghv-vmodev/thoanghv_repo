import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guard/auth-guard.guard';
import { HomePageComponent } from 'src/app/layouts/connect-layout/home-page/home-page.component';
import { LoginComponent } from 'src/app/login/login.component';
import { SucculentsComponent } from 'src/app/layouts/connect-layout/product/succulents/succulents.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { UserCheckOutComponent } from './product/user-check-out/user-check-out.component';
import { ViewCartComponent } from './product/view-cart/view-cart.component';

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
    path: 'cacti', component: CactiComponent,
  },

  {
    path: 'plants', component: PlantsComponent
  },

  {
    path: 'succulents', component: SucculentsComponent
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
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
