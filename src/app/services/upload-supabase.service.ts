import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
	providedIn: "root",
})
export class UploadSupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(
			process.env["SUPABASE_URL"] ?? "",
			process.env["SUPABASE_KEY"] ?? ""
		);
	}

	async uploadFile(file: File) {
		const { data, error } = await this.supabase.storage
			.from("Image")
			.upload(`/Product/${file.name}`, file);
		if (error) {
			throw new Error(error.message);
		}
		return data;
	}

	async downloadFile(bucket: string, path: string) {
		const { data, error } = await this.supabase.storage
			.from(bucket)
			.download(path);
		if (error) {
			throw new Error(error.message);
		}
		return data;
	}

	async deleteFile(bucket: string, path: string) {
		const { error } = await this.supabase.storage
			.from(bucket)
			.remove([path]);
		if (error) {
			throw new Error(error.message);
		}
		return true;
	}

	async listFiles(bucket: string, path: string) {
		const { data, error } = await this.supabase.storage
			.from(bucket)
			.list(path);
		if (error) {
			throw new Error(error.message);
		}
		return data;
	}
}
