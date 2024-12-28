export interface LoginResponse {
	token: string;
	user: {
		id: number;
		username: string;
		email: string;
		// add other user properties as needed
	};
}
