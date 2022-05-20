import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { ContactI } from 'src/app/models/contact.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { loginFormI } from 'src/app/models/login.interface';
import { OrderI } from 'src/app/models/order.interface';
import { ProductOperationI } from 'src/app/models/product-operation';
import { UserI } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:5000/api/";

  jwtUser:any = localStorage.getItem('userJwt');
  

  

  constructor(private http:HttpClient) { }

  getAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('userJwt'));
  }

  getCustomers():Observable<ApiResponseI>{
    let direccion = this.url + "customer";

    return this.http.get<ApiResponseI>(direccion,{headers:this.getAuthorizationHeader()});
  }

  addOrder(order:OrderI){
    let direccion = this.url + "order";

    return this.http.post<ApiResponseI>(direccion,order,{headers:this.getAuthorizationHeader()});
  }

  getOrderPrices(order:OrderI){
    let direccion = this.url + "order/getPrices";

    return this.http.post<ApiResponseI>(direccion,order,{headers:this.getAuthorizationHeader()});
  }

  addCustomer(product: CustomerI){
    let direccion = this.url + "customer";

    return this.http.post<ApiResponseI>(direccion,product,{headers:this.getAuthorizationHeader()});
  }

  editCustomer(product: CustomerI){
    let direccion = this.url + "customer/update";
    return this.http.put<ApiResponseI>(direccion,product,{headers:this.getAuthorizationHeader()});
  }

  removeCustomer(ids: number[]){
    let direccion = this.url + "customer/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direccion,{body,headers:this.getAuthorizationHeader()});    
  }

  getAllCustomerMailAddresses(){
    let direccion = this.url + "customer/mailAddresses";
    return this.http.get<ApiResponseI>(direccion,{headers:this.getAuthorizationHeader()});
  }
  
  getProducts():Observable<ApiResponseI>{
    let direccion = this.url + "product";

    return this.http.get<ApiResponseI>(direccion,{headers:this.getAuthorizationHeader()});
  }

  addProduct(product: ProductOperationI){
    let direccion = this.url + "product";

    return this.http.post<ApiResponseI>(direccion,product,{headers:this.getAuthorizationHeader()});
  }

  editProduct(product: ProductOperationI){
    let direccion = this.url + "product/update";
    return this.http.put<ApiResponseI>(direccion,product,{headers:this.getAuthorizationHeader()});
  }

  removeProduct(ids: number[]){
    let direccion = this.url + "product/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direccion,{body,headers:this.getAuthorizationHeader()});    
  }

  addUser(user: UserI){
    let direccion = this.url + "user";

    return this.http.post<ApiResponseI>(direccion,user);
  }

  authenticateUser(credentials: loginFormI){
    let direccion = this.url + "user/authenticate";
    return this.http.post<ApiResponseI>(direccion,credentials);
  }

  getAllMailAddresses(){
    let direccion = this.url + "user/mailAddresses";
    return this.http.get<ApiResponseI>(direccion);
  }


  getTokenLifeTime(token:string){
    let direccion = this.url + "user/tokenLifeTime/" + token;
    return this.http.get<number>(direccion);
  }

  sendContactMail(data:ContactI){
    let direccion = this.url + "contact/sendMail";
    return this.http.post<ApiResponseI>(direccion,data,{headers:this.getAuthorizationHeader()});
  }
}
