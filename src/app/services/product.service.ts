import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private apiUrl = "http://localhost:82/php/s4_php/api"; // Adjust this to your API URL

	constructor(private http: HttpClient) {}

	getBestSellers(): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiUrl}/products/bestsellers`);
	}

	getProducts(): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiUrl}/products`);
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
}
