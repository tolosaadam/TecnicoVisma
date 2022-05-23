import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { delay, map, Observable, of } from 'rxjs';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { IStepOne, IStepThree, IStepTwo } from 'src/app/models/comunication-models/stepper.interface';
import { UserI } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NavigateService } from 'src/app/services/navigate/navigate.service';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  public message:string = '';
  public progress:number = 0;
  @Output() public onUploadFinished = new EventEmitter();



  user: UserI = {
    id:0,
    firstName: '',
    lastName: '',
    birthday: '',
    gender: undefined,
    country: undefined,
    postalCode: '',
    address: '',
    mailAddress: '',
    password: '',
    filePath: ''
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
    mailAddress: ['', [Validators.required, Validators.email], [this.usernameValidator()]],
    password: ['', Validators.required]
  });
  
  takenMailAddress:string[] = [];
  stepperOrientation:any;
  hide:boolean = true;

  files: File[] = [];

  ImageBaseData!: ArrayBuffer;



  constructor(private mixpanelService: MixpanelService,private api:ApiService, private navigate:NavigateService,private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private toast:NgToastService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 920px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
   }

  ngOnInit(): void {
    this.api.getAllMailAddresses().subscribe(data =>{
      this.takenMailAddress = data.data;  
    });
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

  onSubmit(stepOne:IStepOne,stepTwo:IStepTwo,stepThree:IStepThree): void{
    if(!this.personalDataFormGroup.valid || !this.localizationDataFormGroup.valid || !this.loginFormGroup.valid){
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
          this.mixpanelService.track("Sign up");
          this.navigate.goToLogin();
        }
      });  
    }
  }

  goToLogin(): void{
    this.navigate.goToLogin();
  }

  // onSelect(event:any) {
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  // }

  // onRemove(event:any) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }

  public uploadFile = (files: any) => {
    if(files.length === 0){
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.api.addFile(formData).subscribe((response:ApiResponseI) => {
      this.user.filePath = response.data;
    })
  }

}
