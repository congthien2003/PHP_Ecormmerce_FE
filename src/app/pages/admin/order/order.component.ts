import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { OrderService } from "../../../services/order.service";
import { Order } from "../../../model/order";
import { CommonModule } from "@angular/common";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogModule,
	MatDialogRef,
	MatDialogTitle,
} from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
@Component({
	selector: "app-order",
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
	],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent {
	orders: Order[] = [];

	constructor(private orderService: OrderService, private router: Router) {}

	ngOnInit(): void {
		this.fetchOrders();
	}

	fetchOrders(): void {
		this.orderService.getAllOrders().subscribe((res: any) => {
			this.orders = res.data;
		});
	}

	convertPaymentMethod(paymentMethod: number): string {
		switch (paymentMethod) {
			case 1:
				return "Banking";
			case 2:
				return "COD";
			default:
				return "Unknown";
		}
	}

	getStatusClass(status: string): string {
		switch (status.toLowerCase()) {
			case "completed":
				return "status-completed";
			case "inprogress":
				return "status-inprogress";
			case "pending":
				return "status-pending";
			case "cancelled":
				return "status-cancelled";
			default:
				return "";
		}
	}

	updateOrderStatus(orderId: number, newStatus: string): void {
		this.orderService
			.updateOrderStatus(orderId, newStatus)
			.subscribe((updatedOrder) => {
				console.log("Order status updated:", updatedOrder);
				// Update the order status in your component's data or UI
			});
	}
	readonly dialog = inject(MatDialog);
	showOrderDetails(order: Order): void {
		this.router.navigate(["/admin/order", order.Id]);
	}
}
