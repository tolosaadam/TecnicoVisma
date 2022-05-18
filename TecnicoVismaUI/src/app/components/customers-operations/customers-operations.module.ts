import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersOperationsComponent } from './customers-operations.component';



@NgModule({
  declarations: [
    CustomersOperationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CustomersOperationsComponent
  ]
})
export class CustomersOperationsModule { }
