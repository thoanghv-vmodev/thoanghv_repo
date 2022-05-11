import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusInputDirective } from './Directive/focusinput.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryComponent } from './product/category/category.component';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { SucculentsComponent } from './product/succulents/succulents.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoryJsonService } from './service/category-json.service';
import { ViewCartComponent } from './product/view-cart/view-cart.component';
import { ShareComModule } from './share/share-com/share-com.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CategoryComponent,
    CactiComponent,
    PlantsComponent,
    SucculentsComponent,
    LoginComponent,
    RegisterComponent,
    FocusInputDirective,
    ViewCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareComModule,
    AdminModule,
  ],
  providers: [CategoryJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
