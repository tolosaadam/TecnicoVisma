import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { empty } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { ProductOperationI } from 'src/app/models/product-operation';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: ProductOperationI = new ProductOperationI;
  dataApiResponse: ApiResponseI = {
    data: undefined,
    isError: false,
    errorMessage: ''
  };

  productForm = new FormGroup({
    name : new FormControl('',Validators.required),
    details : new FormControl('',Validators.required),
    unitPrice : new FormControl('',Validators.required),
    unitsInStock : new FormControl('',Validators.required)
    // categoryId : new FormControl('',Validators.required),
    // brandId :  new FormControl('',Validators.required),

  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<ProductFormComponent>,private api:ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(form:ProductI){
    this.product.name = form.name;
    this.product.details = form.details;
    this.product.unitPrice = form.unitPrice;
    this.product.unitsInStock = form.unitsInStock;
    // this.product.categoryId = form.categoryId;
    // this.product.brandId = form.brandId;   
    // this.product.imagePath = this.response.dbPath;
    this.api.addProduct(this.product).subscribe(data => {
      this.dataApiResponse = data;
      this.closeDialog(); 
    });
  }

  closeDialog() {
    this.dialogRef.close(this.dataApiResponse);
  }

}
