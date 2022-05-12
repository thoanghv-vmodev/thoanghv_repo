import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CactiComponent } from 'src/app/product/cacti/cacti.component';
import { PlantsComponent } from 'src/app/product/plants/plants.component';
import { SucculentsComponent } from 'src/app/product/succulents/succulents.component';
import { ViewCartComponent } from 'src/app/product/view-cart/view-cart.component';
import { RegisterComponent } from 'src/app/register/register.component';

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
    path: 'view-cart', component: ViewCartComponent
  },

  {
    path: 'product-list',
    loadChildren: () => import('../../product/product-list/product-list.module').then(m => m.ProductListModule),
    // canLoad: [CanLoadPageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
