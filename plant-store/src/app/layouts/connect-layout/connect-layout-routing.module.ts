import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guard/auth-guard.guard';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CactiComponent } from 'src/app/product/cacti/cacti.component';
import { PlantsComponent } from 'src/app/product/plants/plants.component';
import { SucculentsComponent } from 'src/app/product/succulents/succulents.component';
import { UserCheckOutComponent } from 'src/app/product/user-check-out/user-check-out.component';
import { ViewCartComponent } from 'src/app/product/view-cart/view-cart.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { SearchResultComponent } from 'src/app/search-result/search-result.component';

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
    path: 'view-cart', component: ViewCartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'check-out', component: UserCheckOutComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'search-result',
     component: SearchResultComponent,
  },

  {
    path: 'product-list',
    loadChildren: () => import('../../product/product-list/product-list.module').then(m => m.ProductListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
