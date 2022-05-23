import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, map, Observable, of } from 'rxjs';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { DialogDataI } from 'src/app/models/comunication-models/dialogData.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customer: CustomerI = {
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    gender: undefined,
    country: undefined,
    postalCode: '',
    address: '',
    mailAddress: '',
    productDiscount: 0
  };
  dataApiResponse: ApiResponseI = {
    data: undefined,
    isError: false,
    errorMessage: ''
  };
  takenMailAddress:string[] = [];

  customerForm = new FormGroup({
    firstName : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["firstName"] : '',Validators.required),
    lastName : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["lastName"] : '',Validators.required),
    birthday : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["birthday"] : '',Validators.required),
    gender : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["gender"] : '',Validators.required),
    country : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["country"] : '',Validators.required),
    postalCode : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["postalCode"] : '',Validators.required),
    address : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["address"] : '',Validators.required),
    mailAddress : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["mailAddress"] : '',[Validators.required,Validators.email],[this.usernameValidator()]),
    productDiscount : new FormControl(this.data.data["key"] == "edit" ? this.data.data["data"][0]["productDiscount"] : '',Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogDataI, public dialogRef: MatDialogRef<CustomerFormComponent>,private api:ApiService,private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
    this.api.getAllCustomerMailAddresses().subscribe(data =>{
      this.takenMailAddress = data.data;  
    });
  }

  onSubmit(form:CustomerI){
    this.customer.firstName = form.firstName;
    this.customer.lastName = form.lastName;
    this.customer.birthday = form.birthday;
    this.customer.gender = form.gender;
    this.customer.country = form.country;
    this.customer.postalCode = form.postalCode;
    this.customer.address = form.address;
    this.customer.mailAddress = form.mailAddress;
    this.customer.productDiscount = form.productDiscount;
    // this.product.imagePath = this.response.dbPath;
    if(this.data.data["key"] == "add"){
      this.api.addCustomer(this.customer).subscribe(async data => {
        this.dataApiResponse = data;
        if(!data.isError && data.data != undefined){
          this.mixpanelService.track("AddCustomer",{MailAddress:this.customer.mailAddress});
        }
        this.closeDialog(); 
      });
    }
    else if(this.data.data["key"] == "edit"){  
      this.customer.id = this.data.data["data"][0]["id"];
      this.api.editCustomer(this.customer).subscribe(data => {
        this.dataApiResponse = data;
        this.closeDialog();
      })
      
    }
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }

  checkIfUsernameExists(mailAddress: string): Observable<boolean> {
    return of(this.takenMailAddress.includes(mailAddress)).pipe(delay(1000));
  }

  closeDialog() {
    this.dialogRef.close(this.dataApiResponse);
  }

}
