import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/models/apiResponse.interface';
import { ProductI } from 'src/app/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:5000/api/"

  constructor(private http:HttpClient) { }

  getProduct(id:number):Observable<ProductI>{
    let direccion = this.url + "product";

    return this.http.get<ProductI>(direccion+'/'+id);
  }
  
  getProducts():Observable<ProductI[]>{
    let direccion = this.url + "product";

    return this.http.get<ProductI[]>(direccion);
  }


  // addProduct(product: ProductOperationI){
  //   let direccion = this.url + "product";

  //   return this.http.post<ProductI>(direccion,product);
  // }

  editProduct(product: ProductI){
    let direccion = this.url + "product/update";
    return this.http.put<ProductI[]>(direccion,product);
  }

  removeProduct(ids: number[]){
    let direccion = this.url + "product/remove";
    const body = ids
    return this.http.delete<ApiResponseI>(direccion,{body});    
  }
}
