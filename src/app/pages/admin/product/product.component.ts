import { Component } from "@angular/core";
import { Product, ProductResponse } from "../../../model/Product";
import { ProductService } from "../../../services/product.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-product",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss",
})
export class ProductComponent {
	products: ProductResponse[] = [];
	newProduct: Product = {
		ID: 0,
		Name: "",
		Description: "",
		Price: 0,
		ImageURL: "",
		CategoryId: 0,
	};

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.fetchProducts();
	}

	fetchProducts(): void {
		this.productService.getProducts().subscribe((res: any) => {
			this.products = res.data.products as ProductResponse[];
		});
	}

	createProduct(): void {
		this.productService
			.createProduct(this.newProduct)
			.subscribe((createdProduct: Product) => {});
	}

	updateProduct(product: Product): void {
		this.productService.updateProduct(product.ID, product).subscribe(() => {
			// Update the product in the component's data or UI
		});
	}

	deleteProduct(productId: number): void {
		this.productService.deleteProduct(productId).subscribe(() => {
			// Remove the product from the component's data or UI
			this.products = this.products.filter(
				(product: Product) => product.ID !== productId
			);
		});
	}
}
