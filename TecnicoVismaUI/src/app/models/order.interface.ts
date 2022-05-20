import { OrderDetailsI } from "./orderDetails.interface";

export interface OrderI{
    id:number;
    userId:number;
    customerId:number;
    dateOfOrder:any;
    totalOrder:number;
    orderDetails:OrderDetailsI[];
}