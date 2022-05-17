import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from 'src/app/admin/admin-category/admin-category.component';
import { AdminHistoryComponent } from 'src/app/admin/admin-history/admin-history.component';
import { AdminProductComponent } from 'src/app/admin/admin-product/admin-product.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareComModule } from 'src/app/share/share-com/share-com.module';


@NgModule({
  declarations: [
    AdminCategoryComponent,
    AdminProductComponent,
    AdminHistoryComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareComModule
  ]
})
export class AdminLayoutModule { }
