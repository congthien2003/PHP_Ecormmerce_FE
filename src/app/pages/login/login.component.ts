import { Component } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	loginForm: FormGroup;
	isLoading = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(3)]],
		});
	}

	get email() {
		return this.loginForm.get("email");
	}
	get password() {
		return this.loginForm.get("password");
	}

	onSubmit() {
		if (this.loginForm.valid) {
			this.isLoading = true;
			console.log(this.loginForm.value);
			this.authService.login(this.loginForm.value).subscribe({
				next: (res) => {
					sessionStorage.setItem("token", res.token);
					sessionStorage.setItem("user", JSON.stringify(res.user));
					this.authService.updateLoginState(true);

					this.router.navigate(["/"]);
					//
				},
				error: (error: Error) => {
					console.error("Login error:", error);
					this.isLoading = false;
				},
			});
		}
	}
}
