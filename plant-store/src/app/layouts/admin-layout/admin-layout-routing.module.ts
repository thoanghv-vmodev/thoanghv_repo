import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from 'src/app/pages/admin/admin-category/admin-category.component';
import { AdminHistoryComponent } from 'src/app/pages/admin/admin-history/admin-history.component';
import { AdminProductComponent } from 'src/app/pages/admin/admin-product/admin-product.component';

const routes: Routes = [

  {
    path: 'admin',
    redirectTo:'/admin-category',
    pathMatch: 'full',
  },

  {
    path:'admin-category', component: AdminCategoryComponent,
    pathMatch: 'full',
  },
  {
    path:'admin-product', component: AdminProductComponent,
    pathMatch: 'full',
  },
  {
    path:'admin-history', component: AdminHistoryComponent,
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
