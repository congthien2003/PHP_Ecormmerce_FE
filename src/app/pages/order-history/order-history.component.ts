import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { Order } from "../../model/order";
import { CommonModule } from "@angular/common";

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
			id: 1,
			user_id: 2,
			total_amount: 100000,
			status: "pending",
			created_at: "",
			items: [
				{
					id: 1,
					order_id: 1,
					product_id: 2,
					product_name: "Kit Record Alice",
					quantity: 1,
					price: 300000,
					subtotal: 0,
				},
			],
		},
	];
	isLoading = false;
	error: string | null = null;
	selectedOrder: Order | null = null;

	constructor(private orderService: OrderService) {}

	ngOnInit(): void {
		// this.loadOrders();
	}

	loadOrders(): void {
		this.isLoading = true;
		this.error = null;

		this.orderService.getUserOrders().subscribe({
			next: (orders) => {
				this.orders = orders;
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
