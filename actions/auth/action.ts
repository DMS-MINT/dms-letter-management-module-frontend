"use server";

import axiosInstance from "@/actions/axiosInstance";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { handleAxiosError } from "@/utils";
import getErrorMessage from "./getErrorMessage";

const SESSION_NAME = "DMS";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export interface ICredentials {
	email: string;
	password: string;
}

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 day")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function get_session() {
	const session = cookies().get(SESSION_NAME)?.value;
	if (!session) return null;

	return await decrypt(session);
}

export async function signIn(credentials: ICredentials) {
	try {
		const response = await axiosInstance.post("auth/login/", credentials);

		const sessionId = response.data.session;

		const expires = Date.now() + 24 * 60 * 60 * 1000;
		const session = await encrypt({ sessionId, expires });

		cookies().set(SESSION_NAME, session, {
			expires: expires,
			httpOnly: true,
			sameSite: "lax",
			secure: false,
		});

		return "Welcome back! You have successfully logged in.";
	} catch (error: any) {
		throw getErrorMessage(error);
	}
}

export async function signOut() {
	try {
		await axiosInstance.get("auth/logout/");

		cookies().set(SESSION_NAME, "", { expires: new Date(0) });
	} catch (error: any) {
		const errorMessage = handleAxiosError(error);
		throw errorMessage;
	}
}

export async function get_user() {
	try {
		const response = await axiosInstance.get("auth/me/");
		const data = await response.data;
		return data.data;
	} catch (error: any) {
		handleAxiosError(error);
	}
}

export async function requestQRCode() {
	try {
		const response = await axiosInstance.post("auth/qr-code/");
		return response.data.qr_code_image;
	} catch (error: any) {
		throw error;
	}
}

export async function validateOneTimePassword(otp: number) {
	try {
		const response = await axiosInstance.post("auth/validate-otp/", { otp });
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status === 400) {
			throw "የተሳሳተ የማረጋገጫ ኮድ፣ እባክዎ እንደገና ይሞክሩ።";
		}
		throw error;
	}
}
