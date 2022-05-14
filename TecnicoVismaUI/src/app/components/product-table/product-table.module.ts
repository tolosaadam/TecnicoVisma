import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';
import { MatTableModule } from '@angular/material/table'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogModule } from '../shared-components/confirmation-dialog/confirmation-dialog.module';
import { ProductFormModule } from '../shared-components/product-form/product-form.module';




@NgModule({
  declarations: [
    ProductTableComponent
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
    ProductFormModule
  ],
  exports:[
    ProductTableComponent
  ]
})
export class ProductTableModule { }
