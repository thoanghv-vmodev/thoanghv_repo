import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { RoleGuard } from './Guard/role.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConnectLayoutComponent } from './layouts/connect-layout/connect-layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

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
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  },

  )],
  exports: [RouterModule],
   providers: [
    {
      provide: 'canActivateTeam',
      useValue: (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) => false
    },
  ]
})
export class AppRoutingModule {}
