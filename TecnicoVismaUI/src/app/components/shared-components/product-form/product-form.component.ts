import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { CategoryI } from 'src/app/models/category.interface';
import { DialogDataI } from 'src/app/models/dialogData.interface';
import { ProductOperationI } from 'src/app/models/product-operation';
import { ProductI } from 'src/app/models/product.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories:CategoryI[] = [];
  product: ProductOperationI = new ProductOperationI;
  dataApiResponse: ApiResponseI = {
    data: undefined,
    isError: false,
    errorMessage: ''
  };

  productForm = new FormGroup({
    name : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["name"] : '',Validators.required),
    details : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["details"] : '',Validators.required),
    unitPrice : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["unitPrice"] : '',Validators.required),
    unitsInStock : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["unitsInStock"] : '',Validators.required),
    categoryId: new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["categoryId"] :'',Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogDataI, public dialogRef: MatDialogRef<ProductFormComponent>,private api:ApiService,private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe((data:ApiResponseI) => {
      this.categories = data.data;
    });
  }

  onSubmit(form:ProductI){
    this.product.name = form.name;
    this.product.details = form.details;
    this.product.unitPrice = form.unitPrice;
    this.product.unitsInStock = form.unitsInStock;
    this.product.categoryId = form.categoryId;
    // this.product.imagePath = this.response.dbPath;
    if(this.data.data["key"] == "add"){
      this.api.addProduct(this.product).subscribe(data => {
        this.dataApiResponse = data;
        if(!data.isError && data.data != undefined){
          this.mixpanelService.track("AddProduct",{Name:this.product.name});
        }
        this.closeDialog();
      });
    }
    else if(this.data.data["key"] == "edit"){  
      this.product.id = this.data.data["data"][0]["id"];
      this.api.editProduct(this.product).subscribe(data => {
        this.dataApiResponse = data;
        this.closeDialog();
      })
      
    }
  }

  closeDialog() {
    this.dialogRef.close(this.dataApiResponse);
  }

}
