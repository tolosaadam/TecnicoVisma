import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersExpensesComponent } from './customers-expenses.component';



@NgModule({
  declarations: [
    CustomersExpensesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CustomersExpensesComponent
  ]
})
export class CustomersExpensesModule { }
