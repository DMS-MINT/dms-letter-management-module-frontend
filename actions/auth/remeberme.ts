import { decrypt, encrypt } from "@/actions/auth/action";
interface Value {
	email: string;
	password: string;
}

export async function storeCredentials(values: Value & { remember?: boolean }) {
	if (values.remember) {
		const credentials = {
			email: values.email,
			password: values.password,
		};

		const token = await encrypt(credentials);

		localStorage.setItem("credentials", token);
	} else {
		localStorage.removeItem("credentials");
	}
}

export async function retrieveCredentials() {
	const token = localStorage.getItem("credentials");
	if (token) {
		try {
			const credentials = await decrypt(token);
			return {
				email: credentials.email,
				password: credentials.password,
			};
		} catch (e) {
			console.error("Failed to verify JWT:", e);
			localStorage.removeItem("credentials");
			return null;
		}
	}
	return null;
}

export const handleLogout = () => {
	localStorage.removeItem("credentials");
};
