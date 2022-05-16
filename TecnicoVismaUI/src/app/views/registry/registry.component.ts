import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { IStepOne, IStepThree, IStepTwo } from 'src/app/models/stepper.interface';
import { UserI } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NavigateService } from 'src/app/services/navigate/navigate.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  user: UserI = {
    firstName: '',
    lastName: '',
    birthday: '',
    gender: undefined,
    country: undefined,
    postalCode: '',
    address: '',
    mailAddress: '',
    password: ''
  };

  personalDataFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
  });
  localizationDataFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    address: ['', Validators.required],
  });
  loginFormGroup = this._formBuilder.group({
    mailAddress: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });
  
  stepperOrientation:any;
  hide:boolean = true;



  constructor(private api:ApiService, private navigate:NavigateService,private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private toast:NgToastService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 920px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
   }

  ngOnInit(): void {
  }

  onSubmit(stepOne:IStepOne,stepTwo:IStepTwo,stepThree:IStepThree): void{
    if(!this.personalDataFormGroup.valid || !this.localizationDataFormGroup.valid || !this.loginFormGroup){
      this.toast.info({detail:"Info Message",summary:"Please complete all the fields."});
    }
    else{
      this.user.firstName = stepOne.firstName;
      this.user.lastName = stepOne.lastName;
      this.user.birthday = stepOne.birthday;
      this.user.gender = stepOne.gender;
      this.user.country = stepTwo.country;
      this.user.postalCode = stepTwo.postalCode;
      this.user.address = stepTwo.address;
      this.user.mailAddress = stepThree.mailAddress;
      this.user.password = stepThree.password;
      this.api.addUser(this.user).subscribe((data:ApiResponseI) => {
        if(data.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else{
          this.toast.success({detail:"Sucess Message",summary:"You registered successfully"});
          this.navigate.goToLogin();
        }
      });  
    }
  }

  goToLogin(): void{
    this.navigate.goToLogin();
  }

}
