import { CategoryI } from "./category.interface";

export interface ProductI {
    id: number;
    name: string;
    details: string;
    unitPrice: number;
    unitsInStock: number;
    // category: CategoryI;
    // imagePath: string; 
}
