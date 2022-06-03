import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminCategoryComponent } from 'src/app/pages/admin/admin-category/admin-category.component';
import { AdminHistoryComponent } from 'src/app/pages/admin/admin-history/admin-history.component';
import { AdminProductComponent } from 'src/app/pages/admin/admin-product/admin-product.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    AdminCategoryComponent,
    AdminProductComponent,
    AdminHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminLayoutRoutingModule,
    ReactiveFormsModule,
    ShareModule,
  ]
})
export class AdminLayoutModule { }
