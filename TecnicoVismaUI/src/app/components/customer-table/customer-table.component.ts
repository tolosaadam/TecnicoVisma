import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { DialogDataI } from 'src/app/models/dialogData.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  customers: CustomerI[] = [];
  // displayedColumns: string[] = ['id', 'name', 'details', 'unitPrice','unitsInStock','category','brand','imagePath','actions']; 
  displayedColumns: string[] = ['select','id', 'firstName', 'lastName', 'birthday','gender','country','postalCode','address','mailAddress','productDiscount']; 
  selection = new SelectionModel<CustomerI>(true, []);

  dataSource = new MatTableDataSource<CustomerI>();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private api:ApiService, private dialogService:DialogService, private toast:NgToastService) {
    this.dataSource = new MatTableDataSource(this.customers);
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.api.getCustomers().subscribe(data =>{
      this.dataSource.data = data.data;  
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: CustomerI): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addRow(){
    let dialogData:DialogDataI = {
      title: "Add Customer",
      data: undefined,
      key: "add"
    };
    this.dialogService.openAddCustomerDialog(dialogData).afterClosed().subscribe((res:ApiResponseI) => {
      if(res.isError){
        this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
      }
      else if(res.data != undefined){
        this.toast.success({detail:"Sucess Message",summary:"The customer have been added"});
        this.dataSource.data = res.data;
      }
    });
    this.selection = new SelectionModel<CustomerI>(true, []);
  }

  removeSelectedRows() {
    let auxSelectedItems = this.selection.selected;
    if(auxSelectedItems.length == 0){
      this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"});
    }
    else{
      this.dialogService.openConfirmationDialog("Are you sure you want to delete these customers?")
      .afterClosed().subscribe(res => {
        if(res){
          let selectedIds:number[] = []
          auxSelectedItems.forEach(item => {
            selectedIds.push(item.id);
          });
          this.api.removeCustomer(selectedIds).subscribe((data:ApiResponseI) => {
            if(data.isError){
              this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
            }
            else{
              this.toast.success({detail:"Sucess Message",summary:"The customers have been deleted"});
              this.dataSource.data = data.data;
            }
          }) 
        }
      });         
      this.selection = new SelectionModel<CustomerI>(true, []);
    }
  }
  
  editSelectedRow(){
    if(this.selection.selected.length == 1){
      let dialogData:DialogDataI = {
        title: "Edit Customer",
        data: this.selection.selected,
        key: "edit"
      };
      this.dialogService.openEditCustomerDialog(dialogData)
      .afterClosed().subscribe((res:ApiResponseI) =>{
        if(res.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else if(res.data != undefined){
          this.toast.success({detail:"Sucess Message",summary:"The customer have been edited"});
          this.dataSource.data = res.data;
        }
      })     
    }
    else{
      if(this.selection.selected.length == 0){
        this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"})
      }
      else{
        this.toast.warning({detail:"Warning Message",summary:"You cannot edit more than one customer"})   
      }
    }
    this.selection = new SelectionModel<CustomerI>(true, []);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
