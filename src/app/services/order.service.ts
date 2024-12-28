import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../model/order";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private apiUrl = "http://localhost:82/php/s4_php/api";

	constructor(private http: HttpClient) {}

	getUserOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(`${this.apiUrl}/orders/history`);
	}

	getOrderDetails(orderId: number): Observable<Order> {
		return this.http.get<Order>(`${this.apiUrl}/orders/${orderId}`);
	}
}
