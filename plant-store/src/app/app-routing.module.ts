import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { CanLoadPageGuard } from './Guard/can-load-page.guard';
import { MyGuardGuard } from './Guard/my-guard.guard';

import { HomePageComponent } from './home-page/home-page.component';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { SucculentsComponent } from './product/succulents/succulents.component';

const routes: Routes = [
  {
    path: 'home-page', component: HomePageComponent,
    children: [

    ]
  },

  {
    path:'', redirectTo:'/home-page', pathMatch:'full'
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
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule),
    canLoad: [CanLoadPageGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {
    preloadingStrategy: PreloadAllModules // load truoc module can sd
  }
  )],
  exports: [RouterModule],
   providers: [ // case khác để guard
    {
      provide: 'canActivateTeam',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => false
    }
  ]
})
export class AppRoutingModule {


 }
