import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table.component';



@NgModule({
  declarations: [
    CustomerTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CustomerTableComponent
  ]
})
export class CustomerTableModule { }
