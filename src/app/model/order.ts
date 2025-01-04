export interface Order {
	Id: number;
	user_id: number;
	total_amount: number;
	status: string;
	order_date: Date;
	payment: number;
	items: OrderItem[];
}

export interface OrderItem {
	Id: number;
	IdOrder: number;
	ProductName: string;
	IdProduct: number;
	Quantity: number;
	Price: number;
}
