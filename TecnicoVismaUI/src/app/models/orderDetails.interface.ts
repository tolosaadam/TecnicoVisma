import { ProductI } from "./product.interface";

export interface OrderDetailsI{
    id:number;
    orderId:number;
    productId:number;
    productName:string;
    productDiscount:number;
    unitPrice:number;
    totalDiscount:number;
    normalPrice:number
    productQuantity:number;
    price:number;
}