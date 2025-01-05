import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, tap } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl = "http://localhost:82/php/s4_php/api";
	private storage: Storage | null = null;

	constructor(
		private http: HttpClient,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		if (isPlatformBrowser(this.platformId)) {
			this.storage = window.sessionStorage;
		}
	}

	login(credentials: { email: string; password: string }): Observable<any> {
		return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
			tap((response: any) => {
				if (response.status === "success") {
					console.log(response);
					this.setToken(response.token);
					this.setUserInfo(response.user);
				}
			})
		);
	}

	register(user: any): Observable<any> {
		return this.http.post(`${this.apiUrl}/auth/register`, user);
	}

	logout(): void {
		if (this.storage) {
			this.storage.clear();
		}
	}

	getToken(): string | null {
		return this.storage ? this.storage.getItem("token") : null;
	}

	setToken(token: string): void {
		if (this.storage) {
			this.storage.setItem("token", token);
		}
	}

	getUserInfo(): any {
		if (!this.storage) return null;

		const userInfo = this.storage.getItem("userInfo");
		return userInfo ? JSON.parse(userInfo) : null;
	}

	setUserInfo(user: any): void {
		if (this.storage) {
			this.storage.setItem("userInfo", JSON.stringify(user));
		}
	}

	isLoggedIn(): boolean {
		return !!this.getToken();
	}

	isAdmin(): boolean {
		const user = this.getUserInfo();
		return user && user.role === 1;
	}
}
