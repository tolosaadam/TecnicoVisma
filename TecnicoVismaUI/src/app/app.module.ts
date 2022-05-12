import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './components/shared-components/footer/footer.module';
import { HeaderModule } from './components/shared-components/header/header.module';
import { ProductTableModule } from './components/product-table/product-table.module';
import { CustomerTableModule } from './components/customer-table/customer-table.module';
import { HomeComponent } from './views/home/home.component';
import { HomeModule } from './views/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FooterModule,
    HeaderModule,
    ProductTableModule,
    CustomerTableModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
