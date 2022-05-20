import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersOperationsComponent } from './customers-operations.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    CustomersOperationsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatStepperModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[
    CustomersOperationsComponent
  ]
})
export class CustomersOperationsModule { }
