import { Component, inject, Input, OnInit } from "@angular/core";
import { Order } from "../../../../model/order";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../../../services/order.service";
import { ActivatedRoute, ParamMap, Route, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-order-detail",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./order-detail.component.html",
	styleUrl: "./order-detail.component.scss",
})
export class OrderDetailComponent implements OnInit {
	idOrder: number = 0;
	order!: Order;
	constructor(
		private orderService: OrderService,
		private router: Router,
		private route: ActivatedRoute
	) {}
	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					this.idOrder = Number(params.get("id"));
					return [];
				})
			)
			.subscribe();

		this.orderService
			.getOrderDetails(this.idOrder)
			.subscribe((res: any) => {
				this.order = res.data;

				this.orderService
					.getOrderDetailByOrderId(this.idOrder)
					.subscribe((res: any) => {
						this.order.items = res.data;
					});
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

	navigateBack(): void {
		this.router.navigate(["/admin/order"]);
	}

	status: string = "Pending";

	changeStatus(event: Event): void {
		event.preventDefault();
		this.status = (event.target as HTMLSelectElement).value;
	}

	saveChanges(): void {
		this.orderService
			.updateOrderStatus(this.idOrder, this.status)
			.subscribe(() => {
				this.order.status = this.status;
			});
	}
}
