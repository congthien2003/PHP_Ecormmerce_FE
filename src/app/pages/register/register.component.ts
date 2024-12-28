import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent {
	registerForm: FormGroup;
	isLoading = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.registerForm = this.fb.group(
			{
				username: ["", [Validators.required, Validators.minLength(3)]],
				email: ["", [Validators.required, Validators.email]],
				password: ["", [Validators.required, Validators.minLength(6)]],
				confirmPassword: ["", [Validators.required]],
				terms: [false, [Validators.requiredTrue]],
			},
			{
				validators: this.passwordMatchValidator,
			}
		);
	}

	get username() {
		return this.registerForm.get("username");
	}
	get email() {
		return this.registerForm.get("email");
	}
	get password() {
		return this.registerForm.get("password");
	}
	get confirmPassword() {
		return this.registerForm.get("confirmPassword");
	}
	get terms() {
		return this.registerForm.get("terms");
	}

	passwordMatchValidator(g: FormGroup) {
		return g.get("password")?.value === g.get("confirmPassword")?.value
			? null
			: { passwordMismatch: true };
	}

	onSubmit() {
		// if (this.registerForm.valid) {
		// 	this.isLoading = true;
		// 	this.authService.register(this.registerForm.value).subscribe({
		// 		next: () => {
		// 			this.router.navigate(["/login"]);
		// 		},
		// 		error: (error) => {
		// 			console.error("Registration error:", error);
		// 			this.isLoading = false;
		// 		},
		// 	});
		// }
	}
}
