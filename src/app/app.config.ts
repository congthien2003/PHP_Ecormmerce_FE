import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withFetch,
	withInterceptors,
} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { authInterceptor } from "./interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
		provideAnimations(),
		ReactiveFormsModule,
	],
};
