import { trigger, transition, style, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { VndPipe } from "../../shared/pipe/vnd.pipe";
import { ProductService } from "../../services/product.service";
import { Category } from "../../model/Category";

@Component({
	selector: "app-category",
	standalone: true,
	imports: [CommonModule, RouterModule, VndPipe],
	templateUrl: "./category.component.html",
	styleUrl: "./category.component.scss",
	animations: [
		trigger("fadeIn", [
			transition(":enter", [
				style({ opacity: 0, transform: "translateY(10px)" }),
				animate(
					"300ms ease-out",
					style({ opacity: 1, transform: "translateY(0)" })
				),
			]),
		]),
	],
})
export class CategoryComponent {
	products: any[] = [
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
	categoryTitle: string = "";
	currentPage: number = 1;
	totalPages: number = 1;
	sortBy: string = "default";
	currentCategory: string = "all";
	categories: Category[] = [
		{ id: "keyboard", name: "Keyboards" },
		{ id: "kit", name: "DIY Kits" },
		{ id: "switch", name: "Switches" },
		{ id: "keycap", name: "Keycaps" },
		{ id: "accessories", name: "Accessories" },
	];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			const category = params["category"];
			this.categoryTitle = this.formatCategoryTitle(category);
			this.loadProducts(1);
		});
	}

	loadProducts(category: number) {
		this.productService
			.getProductsByCategory(category, this.currentPage, this.sortBy)
			.subscribe({
				next: (response: any) => {
					this.products = response.data.products;
					this.totalPages = response.totalPages;
				},
				error: (error) => {
					console.error("Error loading products:", error);
				},
			});
	}

	onSortChange(event: any) {
		this.sortBy = event.target.value;
		this.currentPage = 1;
		this.loadProducts(this.route.snapshot.params["category"]);
	}

	changePage(page: number) {
		this.currentPage = page;
		this.loadProducts(this.route.snapshot.params["category"]);
	}

	addToCart(product: any) {
		// Implement add to cart functionality
	}

	private formatCategoryTitle(category: string): string {
		if (category === "all") return "All Products";
		const foundCategory = this.categories.find(
			(cat) => cat.id === category
		);
		return foundCategory
			? foundCategory.name
			: category.charAt(0).toUpperCase() + category.slice(1);
	}

	onCategoryChange(event: any) {
		const category = event.target.value;
		if (category === "all") {
			this.router.navigate(["/category/all"]);
		} else {
			this.router.navigate(["/category", category]);
		}
	}
}
