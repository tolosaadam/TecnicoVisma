import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/models/comunication-models/apiResponse.interface';
import { ContactI } from 'src/app/models/contact.interface';
import { CustomerI } from 'src/app/models/customer.interface';
import { loginFormI } from 'src/app/models/comunication-models/login.interface';
import { OrderI } from 'src/app/models/order.interface';
import { ProductOperationI } from 'src/app/models/product-operation';
import { UserI } from 'src/app/models/user.interface';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl:string = "";

  jwtUser:any = localStorage.getItem('userJwt');
  

  

  constructor(private settingsService:SettingsService, private http:HttpClient) {
    this.apiUrl = this.settingsService.settings.API_URL;
   }

  getAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('userJwt'));
  }

  //////// Customers Services ////////
  
  getCustomers():Observable<ApiResponseI>{
    let direction = this.apiUrl + "customer";

    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }
  
  addCustomer(product: CustomerI){
    let direction = this.apiUrl + "customer";

    return this.http.post<ApiResponseI>(direction,product,{headers:this.getAuthorizationHeader()});
  }

  editCustomer(product: CustomerI){
    let direction = this.apiUrl + "customer/update";
    return this.http.put<ApiResponseI>(direction,product,{headers:this.getAuthorizationHeader()});
  }

  removeCustomer(ids: number[]){
    let direction = this.apiUrl + "customer/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direction,{body,headers:this.getAuthorizationHeader()});    
  }

  getAllCustomerMailAddresses(){
    let direction = this.apiUrl + "customer/mailAddresses";
    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }

  //////// Orders Services ////////

  addOrder(order:OrderI){
    let direction = this.apiUrl + "order";

    return this.http.post<ApiResponseI>(direction,order,{headers:this.getAuthorizationHeader()});
  }

  getOrderSummary(order:OrderI){
    let direction = this.apiUrl + "order/getOrderSummary";
    return this.http.post<ApiResponseI>(direction,order,{headers:this.getAuthorizationHeader()});
  }

  getAllCustomerExpenses(){
    let direction = this.apiUrl + "order/getAllCustomerExpenses";

    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }

  //////// Products Services ////////

  getProducts():Observable<ApiResponseI>{
    let direction = this.apiUrl + "product";

    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }

  addProduct(product: ProductOperationI){
    let direction = this.apiUrl + "product";

    return this.http.post<ApiResponseI>(direction,product,{headers:this.getAuthorizationHeader()});
  }

  editProduct(product: ProductOperationI){
    let direction = this.apiUrl + "product/update";
    return this.http.put<ApiResponseI>(direction,product,{headers:this.getAuthorizationHeader()});
  }

  removeProduct(ids: number[]){
    let direction = this.apiUrl + "product/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direction,{body,headers:this.getAuthorizationHeader()});    
  }

  getCategories():Observable<ApiResponseI>{
    let direction = this.apiUrl + "product/getCategories";

    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }

  //////// User Services ////////

  async addUser(user: UserI){
    let direction = this.apiUrl + "user";

    return  this.http.post<ApiResponseI>(direction,user);
  }

  getUser(id:number){
    let direction = this.apiUrl + "user/" + id;

    return this.http.get<ApiResponseI>(direction);
  }

  authenticateUser(credentials: loginFormI){
    let direction = this.apiUrl + "user/authenticate";
    return this.http.post<ApiResponseI>(direction,credentials);
  }

  getAllMailAddresses(){
    let direction = this.apiUrl + "user/mailAddresses";
    return this.http.get<ApiResponseI>(direction);
  }


  getTokenLifeTime(token:string){
    let direction = this.apiUrl + "user/tokenLifeTime/" + token;
    return this.http.get<number>(direction);
  }

  sendContactMail(data:ContactI){
    let direction = this.apiUrl + "contact/sendMail";
    return this.http.post<ApiResponseI>(direction,data,{headers:this.getAuthorizationHeader()});
  }

  //////// Document Services ////////

  
  async addFile(formData: any):Promise<Observable<ApiResponseI>>{
    let direction = this.apiUrl + "document/addFile";

    return this.http.post<ApiResponseI>(direction, formData);
  }

  getDocument(serverPath:string){
    let direction = this.apiUrl + "document/" + "getFile/" + serverPath;
    return this.http.get<ApiResponseI>(direction,{headers:this.getAuthorizationHeader()});
  }
}
