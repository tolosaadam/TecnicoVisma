import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/shared-components/confirmation-dialog/confirmation-dialog.component';
import { ProductFormComponent } from 'src/app/components/shared-components/product-form/product-form.component';
import { DialogDataI } from 'src/app/models/dialogData.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  
  openConfirmationDialog(msg: any){
    return  this.dialog.open(ConfirmationDialogComponent,{
      width: '390px',
      disableClose: true,
      position: { top: "80px" },
      panelClass: 'mat-dialog-alert',
      data:{
        message:msg
      }
    });
  }

  openAddProductDialog(data:DialogDataI){
    return this.dialog.open(ProductFormComponent,{
      width:'400px',
      disableClose:true,
      position: {top:"80px"},
      panelClass: 'mat-dialog-product-form',
      data: {
        data: data
      }
    })
  }

  openEditProductDialog(data:DialogDataI){

    return this.dialog.open(ProductFormComponent,{
      width:'400px',
      disableClose:true,
      position: {top:"80px"},
      panelClass: 'mat-dialog-product-form',
      data: {
        data: data
      }
    })
  }
}
