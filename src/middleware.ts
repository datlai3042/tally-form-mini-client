import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const privateRouter = ["/dashboard", "/me"];
const authRouter = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", request.url);

	const access_token = Boolean(request.cookies.get("access_token")?.value);
	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	if (!access_token && privateRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (access_token && authRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (access_token && pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
}

const matcher = [...privateRouter, authRouter, "/"];

// See "Matching Paths" below to learn more
export const config = {
	matcher: matcher,
};