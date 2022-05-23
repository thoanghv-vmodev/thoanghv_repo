import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { AuthInterceptor } from './common/auth.interceptor';
import { CanLoadPageGuard } from './Guard/can-load-page.guard';
import { RoleGuard } from './Guard/role.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConnectLayoutComponent } from './layouts/connect-layout/connect-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/home-page', pathMatch:'full'
  },

  {
    path:'',
    component: AdminLayoutComponent,
    canActivate:[RoleGuard],
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

  {
    path: '**', component: PageNotFoundComponent
  }

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
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule {}
