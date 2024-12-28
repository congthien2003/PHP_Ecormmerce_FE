import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export function authInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
) {
	// Inject the current `AuthService` and use it to get an authentication token:
	const token = inject(AuthService).getToken();
	// Clone the request to add the authentication header.
	if (token) {
		console.log(token);
		const newReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
		return next(newReq);
	}

	return next(req);
}
