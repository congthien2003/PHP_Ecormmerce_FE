import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CategoryComponent } from "./pages/category/category.component";
import { OrderHistoryComponent } from "./pages/order-history/order-history.component";
import { AuthGuard } from "./guards/auth.guard";
import { CheckOutComponent } from "./pages/check-out/check-out.component";
import { OrderComponent } from "./pages/admin/order/order.component";
import { OrderDetailComponent } from "./pages/admin/order/order-detail/order-detail.component";
import { ProductComponent } from "./pages/admin/product/product.component";
import { DetailProductComponent } from "./pages/admin/product/detail-product/detail-product.component";
import { DeniedComponent } from "./pages/denied/denied.component";
import { AdminGuard } from "./guards/admin.guard";

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
	{
		path: "checkout",
		component: CheckOutComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "admin",
		canActivate: [AuthGuard, AdminGuard],
		children: [
			{
				path: "order",
				component: OrderComponent,
			},
			{
				path: "order/:id",
				component: OrderDetailComponent,
			},
			{
				path: "product",
				component: ProductComponent,
			},
			{
				path: "product/edit/:id",
				component: DetailProductComponent,
			},
			{
				path: "product/add",
				component: DetailProductComponent,
			},
			{
				path: "category",
				component: OrderComponent,
			},
		],
		// Only admin users can access the admin routes
	},
	{
		path: "denied",
		component: DeniedComponent,
	},
	{
		path: "**",
		component: HomeComponent, // Redirect to home page if route does not match any defined path
	},
];
