import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddToCartComponent } from 'src/app/product/add-to-cart/add-to-cart.component';
import { ToastsComponent } from 'src/app/toasts/toasts.component';

import { ShareRoutingModule } from './share-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddToCartComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    ShareRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase, "cloud"),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],
  exports: [
    AddToCartComponent,
    ToastsComponent,
    SlickCarouselModule,
    AngularFireModule,
    AngularFireStorageModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ]
})
export class ShareComModule { }
