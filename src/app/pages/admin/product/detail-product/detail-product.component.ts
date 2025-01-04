import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../../model/Product";
import { ProductService } from "../../../../services/product.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UploadSupabaseService } from "../../../../services/upload-supabase.service";

@Component({
	selector: "app-detail-product",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./detail-product.component.html",
	styleUrl: "./detail-product.component.scss",
})
export class DetailProductComponent {
	product: Product = {
		ID: 0,
		Name: "",
		Description: "",
		Price: 0,
		ImageURL: "",
		CategoryId: 0,
	};
	isEditing = false;

	listCategory = [
		{
			id: 1,
			name: "Kit",
		},
		{
			id: 2,
			name: "Switches",
		},
		{
			id: 3,
			name: "Keycaps",
		},
		{
			id: 4,
			name: "Accessories",
		},
	];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private uploadService: UploadSupabaseService
	) {}

	ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get("id");
		let id = 0;
		console.log(id); //
		if (productId) {
			this.isEditing = true;
			this.productService
				.getProductById(+productId)
				.subscribe((response) => {
					this.product = response.data;
				});
		}
	}

	async onSubmit(): Promise<void> {
		if (this.isEditing) {
			this.productService
				.updateProduct(this.product.ID, this.product)
				.subscribe(() => {
					alert("Product updated successfully!");
					this.router.navigate(["/products"]);
				});
		} else {
			await this.uploadFile();
			this.productService.createProduct(this.product).subscribe(() => {
				alert("Product created successfully!");
				this.router.navigate(["/products"]);
			});
		}
	}

	async uploadFile() {
		if (this.fileImage) {
			try {
				const response = await this.uploadService.uploadFile(
					this.fileImage
				);
				console.log("File uploaded:", response);
				this.product.ImageURL =
					`https://jihevrzllgzlsqtcevcf.supabase.co/storage/v1/object/public/Image/` +
					response.path;
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		}
	}

	onCancel(): void {
		this.router.navigate(["/products"]);
	}

	categoryId: number = 1;
	changeCategory(event: Event): void {
		this.product.CategoryId = this.categoryId;
		event.preventDefault();
	}

	fileImage!: File;
	compressedImage: string = "";
	handleChange($event: any): void {
		this.fileImage = $event.target.files[0];
	}
}
