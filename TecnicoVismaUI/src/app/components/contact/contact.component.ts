import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { ContactI } from 'src/app/models/contact.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact : ContactI = {
    name: '',
    mailAddress: '',
    message: ''
  }

  contactFormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    mailAddress: new FormControl(sessionStorage.getItem('userMailAddress') ? sessionStorage.getItem('userMailAddress') : '', [Validators.required, Validators.email]),
    message : new FormControl('',Validators.required),
  })

  constructor(private api:ApiService,private toast:NgToastService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form:ContactI): void{
    if(!this.contactFormGroup.valid){
      this.toast.info({detail:"Info Message",summary:"Please complete all the fields."});
    }
    else{
      this.contact.name = form.name;
      this.contact.mailAddress = form.mailAddress;
      this.contact.message = form.message;
      this.api.sendContactMail(this.contact).subscribe((data:ApiResponseI) => {
        if(data.isError){
          this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
        }
        else{
          this.toast.success({detail:"Sucess Message",summary:"Email sent successfully"});
        }
      });  
    }
  }

}
