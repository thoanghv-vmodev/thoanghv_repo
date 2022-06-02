import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductJsonService } from './service/product-json.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConnectLayoutComponent } from './layouts/connect-layout/connect-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminLayoutComponent,
    ConnectLayoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule
  ],
  providers: [ProductJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
