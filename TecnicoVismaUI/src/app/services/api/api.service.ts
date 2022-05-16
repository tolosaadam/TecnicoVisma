import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { loginFormI } from 'src/app/models/login.interface';
import { ProductOperationI } from 'src/app/models/product-operation';
import { UserI } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:5000/api/"

  constructor(private http:HttpClient) { }

  
  getProducts():Observable<ApiResponseI>{
    let direccion = this.url + "product";

    return this.http.get<ApiResponseI>(direccion);
  }


  addProduct(product: ProductOperationI){
    let direccion = this.url + "product";

    return this.http.post<ApiResponseI>(direccion,product);
  }

  editProduct(product: ProductOperationI){
    let direccion = this.url + "product/update";
    return this.http.put<ApiResponseI>(direccion,product);
  }

  removeProduct(ids: number[]){
    let direccion = this.url + "product/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direccion,{body});    
  }

  addUser(user: UserI){
    let direccion = this.url + "user";

    return this.http.post<ApiResponseI>(direccion,user);
  }

  authenticateUser(credentials: loginFormI){
    let direccion = this.url + "user/authenticate";
    return this.http.post<ApiResponseI>(direccion,credentials);
  }
}
