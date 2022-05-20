
export interface OrderSummaryI{
    totalOrder:number;
    orderDetailsSummary:OrderDetailsSummaryI[]
}

export interface OrderDetailsSummaryI{
    productId:number;
    productName:string;
    productQuantity:number;
    productDiscount:number;
    productUnitPrice:number;
    totalDiscount:number;
    totalNormalPrice:number
    totalDiscountedPrice:number;
}   