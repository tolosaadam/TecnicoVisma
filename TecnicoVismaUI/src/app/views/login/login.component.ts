import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { loginFormI } from 'src/app/models/comunication-models/login.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NavigateService } from 'src/app/services/navigate/navigate.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide:boolean = true;
  credentials:loginFormI={
    mailAddress: '',
    password: ''
  }

  loginForm = new FormGroup({
    mailAddress : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  constructor(private api:ApiService, private navigate:NavigateService, private toast:NgToastService,private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
  }

  onSubmit(form:loginFormI): void{
    if(!this.loginForm.valid){
      this.toast.info({detail:"Info Message",summary:"Please complete all the fields."});
    }
    else{
      this.credentials.mailAddress = form.mailAddress;
      this.credentials.password = form.password;
      this.api.authenticateUser(this.credentials).subscribe((data:ApiResponseI) => {
        if(data.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else if(!data.data.status){
          this.toast.error({detail:"Error Message",summary:data.data.message});
        }
        else{
          this.toast.success({detail:"Success Message",summary:"Sucessfull Login."});
          sessionStorage.setItem('userName', data.data.user.firstName);
          sessionStorage.setItem('userLastName', data.data.user.lastName);
          sessionStorage.setItem('userMailAddress', data.data.user.mailAddress);
          sessionStorage.setItem('userJwt', data.data.token);
          sessionStorage.setItem('userSessionTime', data.data.sessionTime);
          sessionStorage.setItem('userId',data.data.user.id);

          this.mixpanelService.init(data.data.user.mailAddress,data.data.user.firstName,data.data.user.lastName);
          this.mixpanelService.track("Sign in");         
          this.navigate.goToHome();
        }
      })   
    }
  }

  goToRegistry(): void{
    this.navigate.goToRegistry();
  }

}
