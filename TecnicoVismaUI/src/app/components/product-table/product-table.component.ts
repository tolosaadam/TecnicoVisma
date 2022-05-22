import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { NgToastService } from 'ng-angular-popup';
import { DialogDataI } from 'src/app/models/dialogData.interface';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  products: ProductI[] = [];
  // displayedColumns: string[] = ['id', 'name', 'details', 'unitPrice','unitsInStock','category','brand','imagePath','actions']; 
  displayedColumns: string[] = ['select','id', 'name', 'categoryName','details', 'unitPrice','unitsInStock']; 
  selection = new SelectionModel<ProductI>(true, []);
  dataSource = new MatTableDataSource<ProductI>();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private api:ApiService, private dialogService:DialogService, private toast:NgToastService) {
    this.dataSource = new MatTableDataSource(this.products);
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;  
    this.api.getProducts().subscribe(data =>{
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

  checkboxLabel(row?: ProductI): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addRow(){
    let dialogData:DialogDataI = {
      title: "Add Product",
      data: undefined,
      key: "add"
    };
    this.dialogService.openAddProductDialog(dialogData).afterClosed().subscribe((res:ApiResponseI) => {
      if(res.isError){
        this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
      }
      else if(res.data != undefined){
        this.toast.success({detail:"Sucess Message",summary:"The product have been added"});
        this.dataSource.data = res.data;
      }
    });
    this.selection = new SelectionModel<ProductI>(true, []);
  }

  removeSelectedRows() {
    let auxSelectedItems = this.selection.selected;
    if(auxSelectedItems.length == 0){
      this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"});
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
              this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
            }
            else{
              this.toast.success({detail:"Sucess Message",summary:"The products have been deleted"});
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
      let dialogData:DialogDataI = {
        title: "Edit Product",
        data: this.selection.selected,
        key: "edit"
      };
      this.dialogService.openEditProductDialog(dialogData)
      .afterClosed().subscribe((res:ApiResponseI) =>{
        if(res.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else if(res.data != undefined){
          this.toast.success({detail:"Sucess Message",summary:"The product have been edited"});
          this.dataSource.data = res.data;
        }
      })     
    }
    else{
      if(this.selection.selected.length == 0){
        this.toast.warning({detail:"Warning Message",summary:"You have to select at least 1"})
      }
      else{
        this.toast.warning({detail:"Warning Message",summary:"You cannot edit more than one product"})   
      }
    }
    this.selection = new SelectionModel<ProductI>(true, []);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
