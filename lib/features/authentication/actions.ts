"use server";

import axiosInstance from "@/lib/axiosInstance";
import { ICredentials } from "@/typing";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

interface ServerError {
  message: string;
  extra: Record<string, any>;
}

const SESSION_NAME = "DMS_Session";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

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

export async function get_authentication_token(credentials: ICredentials) {
  try {
    const response = await axiosInstance.post("auth/login/", credentials);
    const data = await response.data;

    const token = { token: data.token };

    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const session = await encrypt({ token, expires });

    cookies().set(SESSION_NAME, session, {
      expires: expires,
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });
  } catch (error: any) {
    if (error.response && error.response.data) {
      error?.response?.data.extra?.fields.non_field_errors?.map(
        (msg: string) => {
          throw msg;
        }
      );
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}

export async function delete_authentication_token() {
  try {
    await axiosInstance.post("auth/logout/");

    cookies().set("session", "", { expires: new Date(0) });
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}

export async function get_user_profile() {
  try {
    const response = await axiosInstance.get("auth/me/");
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error;
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error("Request Error: Unable to send request");
    }
  }
}
