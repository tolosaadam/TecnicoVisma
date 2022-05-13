import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';
import { MatTableModule } from '@angular/material/table'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  exports:[
    ProductTableComponent
  ]
})
export class ProductTableModule { }
