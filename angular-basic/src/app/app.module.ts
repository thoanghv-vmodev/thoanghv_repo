import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LifecycleHookComponent } from './lifecycle-hook/lifecycle-hook.component';
import { HeaderComponent } from './header/header.component';
import { AppAutoFocus } from './Directive/hightlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleHookComponent,
    HeaderComponent,
    AppAutoFocus
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
