import { trigger, transition, style, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { VndPipe } from "../../shared/pipe/vnd.pipe";
import { ProductService } from "../../services/product.service";
import { Category } from "../../model/Category";
import { ButtonCartComponent } from "../../component/button-cart/button-cart.component";
import { ProductResponse } from "../../model/Product";

@Component({
	selector: "app-category",
	standalone: true,
	imports: [CommonModule, RouterModule, VndPipe, ButtonCartComponent],
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
	products: ProductResponse[] = [
		{
			ID: 5,
			Name: "Transition Lite keyboard kit",
			Description: "Thương hiệu: Swagkeys",
			Price: 1350000,
			ImageURL:
				"https://bizweb.dktcdn.net/thumb/large/100/484/752/products/transition-lite-3.jpg?v=1727265298660",
			CategoryName: "Kit",
			CategoryId: 1,
		},

		// Add more products as needed
	];
	categoryTitle: string = "";
	currentPage: number = 1;
	totalPages: number = 1;
	sortBy: string = "default";
	currentCategory: string = "all";
	selectedCategory: number = 0;
	categories: Category[] = [
		{ id: 0, name: "All" },
		{ id: 1, name: "Kit" },
		{ id: 2, name: "Switches" },
		{ id: 3, name: "Keycaps" },
		{ id: 4, name: "Accessories" },
	];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.currentCategory = params["category"];
			if (this.currentCategory) {
				this.categories.forEach((c) => {
					if (c.name.toLowerCase() === this.currentCategory) {
						this.selectedCategory = c.id;
					}
				});
			}
			this.loadProducts(this.selectedCategory);
		});
	}

	loadProducts(category: number) {
		this.productService
			.getProducts(category, 12, this.currentPage)
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

	onCategoryChange(event: any) {
		const category = event.target.value;
		if (category === "all") {
			this.router.navigate(["/category/all"]);
		} else {
			this.router.navigate(["/category", category]);
		}
	}
}
