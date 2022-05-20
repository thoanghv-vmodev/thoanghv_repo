import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { CategoryInterceptor } from './common/intercepter-category.interceptor';
import { CanLoadPageGuard } from './Guard/can-load-page.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConnectLayoutComponent } from './layouts/connect-layout/connect-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/home-page', pathMatch:'full'
  },

  {
    path:'',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      }
    ]
  },

  {
    path:'',
    component: ConnectLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/connect-layout/connect-layout.module').then(m => m.ConnectLayoutModule),
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {
    scrollPositionRestoration: 'enabled',
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
export class AppRoutingModule {}
