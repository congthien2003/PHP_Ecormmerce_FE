import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, OrderItem } from "../model/order";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private apiUrl = "http://localhost:82/php/s4_php/api";

	constructor(private http: HttpClient) {}

	getUserOrders(userId: number): Observable<Order[]> {
		return this.http.get<Order[]>(
			`${this.apiUrl}/orders/history/${userId}`
		);
	}

	getOrderDetails(orderId: number): Observable<Order> {
		return this.http.get<Order>(`${this.apiUrl}/orders/${orderId}`);
	}

	getOrderDetailByOrderId(orderId: number): Observable<Order> {
		return this.http.get<Order>(`${this.apiUrl}/orderdetails/${orderId}`);
	}

	createOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(`${this.apiUrl}/orders`, order);
	}

	createOrderDetails(order: {
		IdOrder: number;
		IdProduct: number;
		Quantity: number;
		Price: number;
	}): Observable<Order> {
		return this.http.post<Order>(`${this.apiUrl}/orderdetails`, order);
	}

	getAllOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(`${this.apiUrl}/orders`);
	}

	updateOrderStatus(orderId: number, newStatus: string): Observable<Order> {
		const body = { status: newStatus };
		return this.http.put<Order>(`${this.apiUrl}/orders/${orderId}`, body);
	}
}
