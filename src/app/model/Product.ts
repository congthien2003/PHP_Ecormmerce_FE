import { Category } from "./Category";

export interface Product {
	ID: number;
	Name: string;
	Description: string;
	Price: number;
	ImageURL: string;
	CategoryId: number;
}

export interface ProductResponse extends Product {
	CategoryName: string;
}
