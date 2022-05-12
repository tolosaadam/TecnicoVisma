import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';



@NgModule({
  declarations: [
    ProductTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductTableComponent
  ]
})
export class ProductTableModule { }
