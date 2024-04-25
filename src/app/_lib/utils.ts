import { JwtPayload } from "@/type";
import { jwtDecode } from "jwt-decode";

export const validateEmail = (email: string) => {
	const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
	return email.match(regex);
};

export const normalizePath = (url: string) => {
	return url.startsWith("/") ? url.slice(1) : url;
};

export const expiresToken = (expireString: string) => {
	const expire = Date.parse(expireString);
	return expire / 1000;
};

export const getCookieValueHeader = (CookieName: string, CookiesString: string) => {
	const cookieSplit = CookiesString.split(";");
	let cookies: { [key: string]: string } = {};
	cookieSplit.forEach((pair) => {
		const [name, value] = pair.split("=").map((item) => item.trim());
		cookies[name] = value;
	});

	return cookies[CookieName];
};
