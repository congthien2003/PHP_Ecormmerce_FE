import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class CartService {
	private cartItems: any[] = [];
	private cartItemCount = new BehaviorSubject<number>(0);
	private isBrowser: boolean;
	constructor(@Inject(PLATFORM_ID) private platformId: Object) {
		this.isBrowser = isPlatformBrowser(this.platformId);
		this.loadCart();
	}

	getCartItems() {
		return this.cartItems;
	}

	getCartItemCount() {
		return this.cartItemCount.asObservable();
	}

	addToCart(product: any) {
		const existingItem = this.cartItems.find(
			(item) => item.ID === product.ID
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			this.cartItems.push({ ...product, quantity: 1 });
		}

		this.updateCart();
	}

	removeFromCart(productId: number) {
		this.cartItems = this.cartItems.filter((item) => item.ID !== productId);
		this.updateCart();
	}

	updateQuantity(productId: number, quantity: number) {
		const item = this.cartItems.find((item) => item.ID === productId);
		if (item) {
			item.quantity = quantity;
			this.updateCart();
		}
	}

	clearCart() {
		this.cartItems = [];
		this.updateCart();
	}

	private loadCart() {
		if (this.isBrowser) {
			const savedCart = localStorage.getItem("cart");
			if (savedCart) {
				this.cartItems = JSON.parse(savedCart);
				this.cartItemCount.next(this.cartItems.length);
			}
		}
	}

	private updateCart() {
		if (this.isBrowser) {
			localStorage.setItem("cart", JSON.stringify(this.cartItems));
			this.cartItemCount.next(this.cartItems.length);
		}
	}
}
