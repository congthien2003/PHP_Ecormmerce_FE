import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { Order } from "../../model/order";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-order-history",
	templateUrl: "./order-history.component.html",
	styleUrls: ["./order-history.component.scss"],
	standalone: true,
	imports: [CommonModule],
})
export class OrderHistoryComponent implements OnInit {
	orders: Order[] = [
		{
			Id: 1,
			user_id: 2,
			total_amount: 100000,
			status: "pending",
			order_date: new Date(),
			payment: 1,
			items: [
				{
					Id: 1,
					IdOrder: 1,
					IdProduct: 2,
					ProductName: "Product 1",
					Quantity: 1,
					Price: 300000,
				},
			],
		},
	];
	isLoading = false;
	error: string | null = null;
	selectedOrder: Order | null = null;
	userInfo: any = {};
	constructor(
		private orderService: OrderService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.userInfo = this.authService.getUserInfo();
		this.loadOrders();
	}

	loadOrders(): void {
		this.isLoading = true;
		this.error = null;

		this.orderService.getUserOrders(this.userInfo.id).subscribe({
			next: (res: any) => {
				this.orders = res.data;
				this.isLoading = false;
			},
			error: (err) => {
				this.error = "Failed to load orders. Please try again later.";
				this.isLoading = false;
				console.error("Error loading orders:", err);
			},
		});
	}

	viewOrderDetails(order: Order): void {
		this.selectedOrder = order;
		this.orderService.getOrderDetailByOrderId(order.Id).subscribe({
			next: (res: any) => {
				this.selectedOrder!.items = res.data;
			},
			error: (err) => {
				console.error("Error loading order items:", err);
			},
		});
	}

	closeDetails(): void {
		this.selectedOrder = null;
	}

	getStatusClass(status: string): string {
		switch (status.toLowerCase()) {
			case "completed":
				return "status-completed";
			case "pending":
				return "status-pending";
			case "cancelled":
				return "status-cancelled";
			default:
				return "";
		}
	}
}
