import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProductTableModule } from '../../product-table/product-table.module';
import { CustomerTableModule } from '../../customer-table/customer-table.module';




@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    ProductTableModule,
    CustomerTableModule 
  ],
  exports:[
    SidenavComponent
  ]
})
export class SidenavModule { }
