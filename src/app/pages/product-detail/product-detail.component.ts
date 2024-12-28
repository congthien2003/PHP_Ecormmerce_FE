import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { CommonModule, KeyValuePipe } from "@angular/common";

@Component({
	selector: "app-product-detail",
	standalone: true,
	imports: [CommonModule, RouterModule, KeyValuePipe],
	templateUrl: "./product-detail.component.html",
	styleUrl: "./product-detail.component.scss",
})
export class ProductDetailComponent {
	product: any = {
		name: "GMK Keyboard",
		sku: "KB-001",
		price: 199.99,
		originalPrice: 249.99,
		inStock: true,
		images: [
			"https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/wk-anodized-grey-1731331212068-a7c23839-ff74-4afd-adfe-26697793f57e.jpg?v=1734267649117",
			"https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/wk-spray-coated-bubble-tea-1731331242522-d355e321-46e4-455e-b5fc-014a3a1f8e94.jpg?v=1734267649117",
			"https://bizweb.dktcdn.net/thumb/1024x1024/100/484/752/products/wk-spray-coated-white-1731331268605-cf7e72c1-6b6a-4fb9-b53a-f761ea93c830.jpg?v=1734267649117",
		],
		options: [
			{
				name: "Switch Type",
				values: ["Red", "Blue", "Brown"],
			},
			{
				name: "Layout",
				values: ["US ANSI", "ISO"],
			},
		],
		specifications: {
			"Switch Type": "Cherry MX",
			"Keycap Material": "PBT",
			Connection: "USB-C",
			Lighting: "RGB",
		},
	};

	selectedImage: string = "";
	quantity: number = 1;
	selectedOptions: { [key: string]: string } = {};
	relatedProducts: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private cartService: CartService
	) {}

	ngOnInit() {
		this.selectedImage = this.product.images[0];
		// Initialize selected options
		this.product.options.forEach(
			(option: { name: string | number; values: string[] }) => {
				this.selectedOptions[option.name] = option.values[0];
			}
		);
		// Load related products
		this.loadRelatedProducts();
	}

	selectOption(optionName: string, value: string) {
		this.selectedOptions[optionName] = value;
	}

	decreaseQuantity() {
		if (this.quantity > 1) {
			this.quantity--;
		}
	}

	increaseQuantity() {
		this.quantity++;
	}

	updateQuantity(event: any) {
		const value = parseInt(event.target.value);
		this.quantity = value > 0 ? value : 1;
	}

	addToCart() {
		const productToAdd = {
			...this.product,
			quantity: this.quantity,
			selectedOptions: this.selectedOptions,
		};
		this.cartService.addToCart(productToAdd);
	}

	private loadRelatedProducts() {
		// Implement loading related products
		this.relatedProducts = [
			// Add sample related products
		];
	}
}
