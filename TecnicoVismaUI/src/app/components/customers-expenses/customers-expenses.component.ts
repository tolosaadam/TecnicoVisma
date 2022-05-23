import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { CustomerExpensesI } from 'src/app/models/customerExpenses.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-customers-expenses',
  templateUrl: './customers-expenses.component.html',
  styleUrls: ['./customers-expenses.component.scss']
})
export class CustomersExpensesComponent implements OnInit {

  customerExpenses: CustomerExpensesI[] = [];

  displayedColumns: string[] = ['orderId','customerId','customerName','dateOfOrder','mailAddress','totalProducts','totalExpense']; 

  dataSource = new MatTableDataSource<CustomerExpensesI>();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private api:ApiService) { 
    this.dataSource = new MatTableDataSource(this.customerExpenses);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.api.getAllCustomerExpenses().subscribe((data:ApiResponseI) =>{
      this.dataSource.data = data.data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
