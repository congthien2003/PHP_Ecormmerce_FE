import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "vnd",
	standalone: true,
})
export class VndPipe implements PipeTransform {
	transform(value: number | string): string {
		if (value === null || value === undefined) return "";

		// Convert to number if string
		const price = typeof value === "string" ? parseFloat(value) : value;

		// Format the number with thousand separators
		const formattedPrice = price.toLocaleString("vi-VN", {
			style: "currency",
			currency: "VND",
		});

		return formattedPrice;
	}
}
