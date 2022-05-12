import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from 'src/app/product/add-to-cart/add-to-cart.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareRoutingModule } from './share-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ProductUpdateComponent } from 'src/app/admin/product-update/product-update.component';
// import { AngularFireAuthModule } from "@angular/fire/compat/auth";
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddToCartComponent,
    ProductUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    ShareRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  exports: [
    AddToCartComponent,
    SlickCarouselModule,
    ProductUpdateComponent
  ]
})
export class ShareComModule { }
