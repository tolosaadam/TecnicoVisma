import { CategoryI } from "./category.interface";

export interface ProductI {
    id: number;
    name: string;
    details: string;
    unitPrice: number;
    unitsInStock: number;
    categoryId: number;
    categoryName: string;
    // imagePath: string; 
}
