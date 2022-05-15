import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { loginFormI } from 'src/app/models/login.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // product: ProductOperationI = new ProductOperationI;
  dataApiResponse: ApiResponseI = {
    data: undefined,
    isError: false,
    errorMessage: ''
  };

  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(form:loginFormI): void{

  }

}
