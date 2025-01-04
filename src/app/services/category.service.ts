import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Category } from "../model/Category";

@Injectable({
	providedIn: "root",
})
export class CategoryService {
	private apiUrl = "http://localhost:82/php/s4_php/api";

	constructor(private http: HttpClient) {}

	// Get all categories
	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(`${this.apiUrl}/categories`);
	}

	// Get category by ID
	getCategoryById(id: string): Observable<Category> {
		return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
	}

	// Create new category
	createCategory(category: Category): Observable<Category> {
		return this.http.post<Category>(`${this.apiUrl}/categories`, category);
	}

	// Update category
	updateCategory(id: string, category: Category): Observable<Category> {
		return this.http.put<Category>(
			`${this.apiUrl}/categories/${id}`,
			category
		);
	}

	// Delete category
	deleteCategory(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
	}
}
