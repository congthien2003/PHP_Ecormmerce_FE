import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../../enviroment";
@Injectable({
	providedIn: "root",
})
export class UploadSupabaseService {
	private supabase: SupabaseClient;

	constructor() {
		console.log(SUPABASE_KEY);
		console.log(SUPABASE_URL);
		this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
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
