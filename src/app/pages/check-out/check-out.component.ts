import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { OrderService } from "../../services/order.service";
import { CartService } from "../../services/cart.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Order } from "../../model/order";
import { Router } from "@angular/router";

@Component({
	selector: "app-check-out",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./check-out.component.html",
	styleUrl: "./check-out.component.scss",
})
export class CheckOutComponent {
	isLoggedIn: boolean = false;
	shippingInfo: any = {
		fullName: "",
		email: "",
		phone: "",
		address: "",
	};
	orderItems: any[] = [];
	orderTotal: number = 0;
	selectedPaymentMethod: string = "";
	userInfo: any = {};
	constructor(
		private authService: AuthService,
		private orderService: OrderService,
		private cartService: CartService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
		if (this.isLoggedIn) {
			this.loadUserInfo();
		}
		this.loadOrderItems();
	}

	loadUserInfo(): void {
		this.userInfo = this.authService.getUserInfo();
		this.shippingInfo = {
			fullName: this.userInfo.fullName ?? "Customer",
			email: this.userInfo.email,
			phone: this.userInfo.phone,
			address: this.userInfo.address,
		};
	}

	loadOrderItems(): void {
		this.orderItems = this.cartService.getCartItems();
		this.calculateOrderTotal();
	}

	calculateOrderTotal(): void {
		this.orderTotal = this.orderItems.reduce(
			(total, item) => total + item.Price * item.quantity,
			0
		);
	}

	isFormValid(): boolean {
		return this.isLoggedIn && this.selectedPaymentMethod !== "";
	}

	onSubmit(): void {
		if (this.isFormValid()) {
			const order: Order = {
				user_id: this.userInfo.id,
				Id: 0,
				total_amount: this.orderTotal,
				status: "Pending",
				order_date: new Date(),
				payment: Number.parseInt(this.selectedPaymentMethod),
				items: [],
			};

			console.log(order);

			this.orderService.createOrder(order).subscribe(
				(response: any) => {
					console.log("Order placed successfully:", response);
					// Handle successful order placement (e.g., show confirmation, clear cart, redirect)
					const idOrder = response.data;
					this.orderItems.forEach((item) => {
						this.orderService
							.createOrderDetails({
								IdOrder: idOrder,
								IdProduct: item.ID,
								Quantity: item.quantity,
								Price: item.Price,
							})
							.subscribe();
					});

					this.cartService.clearCart();
					this.router.navigate(["/order/history"]);
				},
				(error: any) => {
					console.error("Error placing order:", error);
					// Handle error (e.g., show error message to user)
				}
			);
			console.log("Order placed successfully:", order);
		}
	}
}
