import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './product/category/category.component';
import { FocusInputDirective } from './Directive/focusinput.directive';
import { CactiComponent } from './product/cacti/cacti.component';
import { PlantsComponent } from './product/plants/plants.component';
import { SucculentsComponent } from './product/succulents/succulents.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CategoryComponent,
    FocusInputDirective,
    CactiComponent,
    PlantsComponent,
    SucculentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
