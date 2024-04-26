import { CustomRequest } from "@/type";

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
	const cookieSplit = CookiesString?.split(";");
	let cookies: { [key: string]: string } = {};
	cookieSplit.forEach((pair) => {
		const [name, value] = pair.split("=").map((item) => item.trim());
		cookies[name] = value;
	});

	return cookies[CookieName];
};

export const setValueLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeValueLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const generateInfoRequest = (url: string, options: CustomRequest) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeader =
		options?.body instanceof FormData
			? {}
			: {
					"Content-Type": "application/json",
			  };

	const baseUrl =
		options?.baseUrl === undefined
			? process.env.NEXT_PUBLIC_MODE === "DEV"
				? "http://localhost:4000"
				: process.env.BACK_END_URL
			: options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	return { body, baseHeader, baseUrl, fullUrl };
};
