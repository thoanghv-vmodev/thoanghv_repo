import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from 'src/app/layouts/admin-layout/admin/admin-category/admin-category.component';
import { AdminHistoryComponent } from 'src/app/layouts/admin-layout/admin/admin-history/admin-history.component';
import { AdminProductComponent } from 'src/app/layouts/admin-layout/admin/admin-product/admin-product.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    AdminCategoryComponent,
    AdminProductComponent,
    AdminHistoryComponent,
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AdminLayoutModule { }
