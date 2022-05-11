import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { CategoryInterceptor } from './common/intercepter-category.interceptor';
import { CanLoadPageGuard } from './Guard/can-load-page.guard';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { SucculentsComponent } from './product/succulents/succulents.component';
import { ViewCartComponent } from './product/view-cart/view-cart.component';

const routes: Routes = [
  {
    path: 'home-page', component: HomePageComponent,
    children: [

    ]
  },
  {
    path: '', redirectTo:'/home-page', pathMatch:'full'
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
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule),
    // canLoad: [CanLoadPageGuard]
  },

  {
    path: 'view-cart', component: ViewCartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {
    preloadingStrategy: PreloadAllModules // load truoc module can sd
  }
  )],
  exports: [RouterModule],
   providers: [
    {
      provide: 'canActivateTeam',
      useValue: ( // case khác để guard
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) => false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CategoryInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule {


 }
