export interface Order {
	id: number;
	user_id: number;
	total_amount: number;
	status: string;
	created_at: string;
	items: OrderItem[];
}

export interface OrderItem {
	id: number;
	order_id: number;
	product_id: number;
	product_name: string;
	quantity: number;
	price: number;
	subtotal: number;
}
