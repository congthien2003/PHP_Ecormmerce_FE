import { Component } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent {
	cartItemCount$ = this.cartService.getCartItemCount();
	isLoggedIn$ = this.authService.isLoggedIn();
	currentUser$ = this.authService.getUserInfo();
	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private router: Router
	) {}

	logout(event: Event) {
		event.preventDefault();
		this.authService.logout();
		window.location.reload();
		this.router.navigate(["/"]);
	}
}
