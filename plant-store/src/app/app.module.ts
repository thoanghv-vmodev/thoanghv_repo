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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductJsonService } from './service/product-json.service';
import { ShareComModule } from './share/share-com/share-com.module';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConnectLayoutComponent } from './layouts/connect-layout/connect-layout.component';
import { DashboardComponent } from './admin/admin-dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FocusInputDirective,
    HeaderAdminComponent,
    AdminLayoutComponent,
    ConnectLayoutComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareComModule,

  ],
  providers: [ProductJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
