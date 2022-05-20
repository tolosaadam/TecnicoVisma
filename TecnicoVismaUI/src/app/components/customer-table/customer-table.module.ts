import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogModule } from '../shared-components/confirmation-dialog/confirmation-dialog.module';
import { CustomerFormModule } from '../shared-components/customer-form/customer-form.module';



@NgModule({
  declarations: [
    CustomerTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    ConfirmationDialogModule,
    CustomerFormModule
  ],
  exports:[
    CustomerTableComponent
  ]
})
export class CustomerTableModule { }
