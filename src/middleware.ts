import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRouter = ["/dashboard", "/me"];
const authRouter = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const access_token = Boolean(request.cookies.get("next_access_token")?.value);
	const refresh_token = Boolean(request.cookies.get("next_refresh_token")?.value);

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", pathname);

	const response = NextResponse.next({
		headers: requestHeaders,
	});
	if (!access_token && !refresh_token && privateRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if ((access_token || refresh_token) && authRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if ((access_token || refresh_token) && pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
}

const matcher = [...privateRouter, authRouter, "/"];

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/dashboard", "/me", "/login", "/register"],
};
