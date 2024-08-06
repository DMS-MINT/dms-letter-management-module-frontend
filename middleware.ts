import { LOGIN, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
import { NextResponse, type NextRequest } from "next/server";
import { get_session } from "./actions/auth/action";

export async function middleware(request: NextRequest) {
	const session = await get_session();

	const isAuthenticated = !!session?.sessionId;
	const { nextUrl } = request;

	const isPublicRoute = PUBLIC_ROUTES.find(
		(route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT
	);

	if (!isAuthenticated && !isPublicRoute) {
		return NextResponse.redirect(new URL(LOGIN, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|svg)$).*)"],
};
