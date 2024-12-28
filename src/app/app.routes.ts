import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CategoryComponent } from "./pages/category/category.component";
import { OrderHistoryComponent } from "./pages/order-history/order-history.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "cart", component: CartComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "product/:id", component: ProductDetailComponent },
	{ path: "category/:category", component: CategoryComponent },
	{
		path: "orders/history",
		component: OrderHistoryComponent,
		canActivate: [AuthGuard],
	},
];
