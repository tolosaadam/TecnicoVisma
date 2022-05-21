import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersExpensesComponent } from './customers-expenses.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CustomersExpensesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule
  ],
  exports:[
    CustomersExpensesComponent
  ]
})
export class CustomersExpensesModule { }
