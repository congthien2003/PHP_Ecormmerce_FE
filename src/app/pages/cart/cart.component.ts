import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CartService } from "../../services/cart.service";
import { VndPipe } from "../../shared/pipe/vnd.pipe";
import { trigger, transition, style, animate } from "@angular/animations";
import { Route, Router, RouterModule } from "@angular/router";

@Component({
	selector: "app-cart",
	standalone: true,
	imports: [CommonModule, FormsModule, VndPipe, RouterModule],
	animations: [
		trigger("fadeSlide", [
			transition(":enter", [
				style({ opacity: 0, transform: "translateX(-10px)" }),
				animate(
					"300ms ease-out",
					style({ opacity: 1, transform: "translateX(0)" })
				),
			]),
			transition(":leave", [
				animate(
					"300ms ease-in",
					style({ opacity: 0, transform: "translateX(-10px)" })
				),
			]),
		]),
		trigger("fadeIn", [
			transition(":enter", [
				style({ opacity: 0 }),
				animate("300ms ease-out", style({ opacity: 1 })),
			]),
		]),
	],
	templateUrl: "./cart.component.html",
	styleUrl: "./cart.component.scss",
})
export class CartComponent {
	cartItems: any[] = [];
	shippingCost: number = 30000; // Example shipping cost

	constructor(private cartService: CartService, private router: Router) {}

	ngOnInit() {
		this.cartItems = this.cartService.getCartItems();
	}

	updateQuantity(item: any, quantity: number) {
		if (quantity > 0) {
			this.cartService.updateQuantity(item.ID, quantity);
			this.cartItems = this.cartService.getCartItems();
		}
	}

	removeItem(item: any) {
		this.cartService.removeFromCart(item.id);
		this.cartItems = this.cartService.getCartItems();
	}

	getSubtotal(): number {
		return this.cartItems.reduce(
			(sum, item) => sum + item.Price * item.quantity,
			0
		);
	}

	getTotal(): number {
		return this.getSubtotal() + this.shippingCost;
	}

	checkout() {
		// Implement checkout logic
		console.log("Proceeding to checkout...");
		this.router.navigateByUrl("/checkout");
	}
}
