import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  products: ProductI[] = [];
  // displayedColumns: string[] = ['id', 'name', 'details', 'unitPrice','unitsInStock','category','brand','imagePath','actions']; 
  displayedColumns: string[] = ['select','id', 'name', 'details', 'unitPrice','unitsInStock']; 
  selection = new SelectionModel<ProductI>(true, []);
  dataSelected = Object.assign(this.products);
  dataSource = new MatTableDataSource<ProductI>();
  

  constructor(private api:ApiService, private dialogService:DialogService, private toast:NgToastService) {
    this.dataSource = new MatTableDataSource(this.products);
   }

  ngOnInit(): void {
    
    this.api.getProducts().subscribe(data =>{
      this.dataSource.data = data;
      this.dataSelected.data = data;    
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

  checkboxLabel(row?: ProductI): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  removeSelectedRows() {
    let auxSelectedItems = this.selection.selected;
    if(auxSelectedItems.length == 0){
      this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"})
    }
    else{
      this.dialogService.openConfirmationDialog("Are you sure you want to delete these products?")
      .afterClosed().subscribe(res => {
        if(res){
          let selectedIds:number[] = []
          auxSelectedItems.forEach(item => {
            selectedIds.push(item.id);
          });
          this.api.removeProduct(selectedIds).subscribe((data:ApiResponseI) => {
            if(data.isError){
              this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."})
            }
            else{
              this.toast.success({detail:"Sucess Message",summary:"The products have been deleted"})
              this.dataSource.data = data.data;
            }
          }) 
        }
      });         
      this.selection = new SelectionModel<ProductI>(true, []);
    }
  }  

  editSelectedRow(){
    if(this.selection.selected.length == 1){
      
      
    }
    else{
      if(this.selection.selected.length == 0){
        this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"})
      }
      else{
        this.toast.warning({detail:"Warning Message",summary:"You cannot edit more than one product"})   
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
