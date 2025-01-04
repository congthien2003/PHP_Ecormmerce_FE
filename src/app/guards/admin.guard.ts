import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AdminGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
			return true;
		}

		this.router.navigate(["/denied"]);
		return false;
	}
}
