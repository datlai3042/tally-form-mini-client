import { differenceInSeconds } from "date-fns";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRouter = ["/dashboard", "/me", "/settings", "/v1/api/token/refresh-token"];
const authRouter = ["/login", "/register", "/"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const access_token = request.cookies.get("next_access_token")?.value;
	const refresh_token = request.cookies.get("next_refresh_token")?.value;
	const client_id = request.cookies.get("next_client_id")?.value;
	const expire_token = request.cookies.get("next_expire_token")?.value;

	const authentication = !!client_id && !!access_token && !!refresh_token;

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", pathname);
	const response = NextResponse.next({
		headers: requestHeaders,
	});

	const regexUrlFormEdit = /^\/form\/[a-zA-Z0-9]+\/edit$/;
	const regexUrlFormShare = /^\/form\/[a-zA-Z0-9]+\/share$/;
	const regexUrlFormSummary = /^\/form\/[a-zA-Z0-9]+\/summary$/;
	const regexUrlFormDownload = /^\/form\/[a-zA-Z0-9]+\/download$/;
	const now = new Date();
	const exprireTokemTime = new Date(expire_token as string);

	if (expire_token && differenceInSeconds(exprireTokemTime, now) < 0) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (pathname === "/" && !authentication) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (pathname === "/" && authentication) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (regexUrlFormEdit.test(pathname) && !authentication) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (regexUrlFormSummary.test(pathname) && !authentication) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (regexUrlFormDownload.test(pathname) && !authentication) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (regexUrlFormShare.test(pathname) && !authentication) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (!authentication && privateRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (authentication && authRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (authentication && pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/dashboard",
		"/settings",
		"/me",
		"/login",
		"/register",
		"/",
		"/form/:path*",
		"/v1/api/token/refresh-token",
	],
};
