import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
@Injectable({
	providedIn: "root",
})
export class ProductService {
	private apiUrl = "http://localhost:82/php/s4_php/api"; // Adjust this to your API URL

	constructor(private http: HttpClient) {}

	getBestSellers(): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiUrl}/products/bestsellers`);
	}

	getProducts(
		categoryId: number = 0,
		limit: number = 12,
		page: number = 1
	): Observable<any[]> {
		const params = new HttpParams()
			.set("category", categoryId)
			.set("limit", limit.toString())
			.set("page", page.toString());
		return this.http.get<any[]>(`${this.apiUrl}/products`, { params });
	}

	getProductsByCategory(
		category: string | number,
		page: number = 1,
		sortBy: string = "default",
		limit: number = 12
	): Observable<any> {
		const params = new HttpParams()
			.set("category", category.toString())
			.set("page", page.toString())
			.set("sort", sortBy)
			.set("limit", limit.toString());

		return this.http.get(`${this.apiUrl}/products`, {
			params,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	getProductById(productId: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/products/${productId}`);
	}

	createProduct(product: any): Observable<any> {
		return this.http.post(`${this.apiUrl}/products`, product);
	}

	updateProduct(productId: number, product: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/products/${productId}`, product);
	}

	deleteProduct(productId: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/products/${productId}`);
	}
}
