import { Component } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { NgFor, NgIf, CommonModule } from "@angular/common";
import { CartService } from "../../services/cart.service";
import { HeaderComponent } from "../../component/header/header.component";
import { RouterModule } from "@angular/router";
import { ButtonCartComponent } from "../../component/button-cart/button-cart.component";
import { VndPipe } from "../../shared/pipe/vnd.pipe";
import { ShowMoreBtnComponent } from "../../component/show-more-btn/show-more-btn.component";
import { Category } from "../../model/Category";
import { CategoryService } from "../../services/category.service";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		CommonModule,
		HeaderComponent,
		RouterModule,
		ButtonCartComponent,
		ShowMoreBtnComponent,
		VndPipe,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	categories: Category[] = [];
	bestSellers = [
		{
			id: 1,
			name: "Krush65",
			description: "Thương hiệu: Nuxroskb",
			Price: 4500000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/krush65.jpg?v=1730982653147",
		},
		{
			id: 2,
			name: "Evo80",
			description: "Thương hiệu: Evoworks",
			Price: 3590000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/ink-1725601692007.jpg?v=1725601696107",
		},
		{
			id: 3,
			name: "Neo Ergo Case",
			description: "Thương hiệu: Qwertykeys",
			Price: 2530000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/neo-ergo-case.jpg?v=1723087406147",
		},
		{
			id: 4,
			name: "[In stock] QK100 Case",
			description: "Thương hiệu: Qwertykeys",
			Price: 3285000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/in-stock-qk100-case-1696986560989.jpg?v=1696986568087",
		},
	];

	products = [
		{
			Id: 5,
			Name: "Transition Lite keyboard kit",
			Description: "Thương hiệu: Swagkeys",
			Price: 1350000,
			ImageURL:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/transition-lite-3.jpg?v=1727265298660",
		},
		{
			id: 6,
			name: "Bridge75",
			description: "Thương hiệu: ShortCut Studio",
			price: 1750000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/bridge75-1714967403467.jpg?v=1714967409093",
		},
		{
			id: 7,
			name: "[Instock] QK65V2 Classic",
			description: "Thương hiệu: Qwertykeys",
			price: 3020000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/qk65v2-classic.jpg?v=1722508570523",
		},
		{
			id: 8,
			name: "Neo80 Case",
			description: "Thương hiệu: Swagkeys",
			price: 880000,
			imageUrl:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/neo80-instock.jpg?v=1714293758973",
		},
		// Add more products as needed
	];

	slides = [
		{
			image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/krush65.jpg?v=1730982653147",
			title: "Welcome to E-Shop",
			description: "Discover amazing products at great prices",
		},
		{
			image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/neo80-instock.jpg?v=1714293758973",
			title: "Special Offers",
			description: "Get up to 50% off on selected items",
		},
	];

	constructor(
		private productService: ProductService,
		private cartService: CartService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		// this.loadBestSellers();

		this.loadProducts();
	}

	loadBestSellers() {
		this.productService.getBestSellers().subscribe(
			(data) => (this.bestSellers = data),
			(error) => console.error("Error loading best sellers:", error)
		);
	}

	loadProducts() {
		this.productService.getProducts().subscribe({
			next: (res: any) => {
				console.log(res.data.products);
				this.products = res.data.products;
			},
			error: (error) => console.error("Error loading products:", error),
		});
	}

	loadCategories() {
		this.categoryService.getCategories().subscribe(
			(categories) => {
				this.categories = categories;
			},
			(error) => {
				console.error("Error loading categories:", error);
			}
		);
	}

	cartItemCount$ = this.cartService.getCartItemCount();

	addToCart(product: any) {
		console.log(product);
		this.cartService.addToCart(product);
	}
}
