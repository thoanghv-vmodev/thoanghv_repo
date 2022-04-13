import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { ShopAllComponent } from './product/shop-all/shop-all.component';
import { SucculentsComponent } from './product/succulents/succulents.component';

const routes: Routes = [
  {
    path: 'home-page', component: HomePageComponent
  },
  {
    path:'', redirectTo:'/home-page', pathMatch:'full'
  },

  {
    path: 'shop-all', component: ShopAllComponent
  },
  {
    path: 'cacti', component: CactiComponent
  },
  {
    path: 'plants', component: PlantsComponent
  },
  {
    path: 'succulents', component: SucculentsComponent
  },

  {
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
