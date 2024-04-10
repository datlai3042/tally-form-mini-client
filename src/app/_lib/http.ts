import { AUTHORIZATION_ERROR_STATUS } from "./httpError";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
	baseUrl?: string;
};

/**
 *
 * @param method phương thức HTTP
 * @param url endpoint
 * @param options các options
 */

export const resquest = async <Response>(method: Method, url: string, options?: CustomRequest | undefined) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeader =
		options?.body instanceof FormData
			? { Authorization: "Bearer 123" }
			: { Authorization: "Bearer 123", "Content-Type": "application/json" };

	const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_BACK_END_URL : options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	const response = await fetch(fullUrl, {
		...options,
		headers: {
			...baseHeader,
			...options?.headers,
		} as any,
		body,
		method,
	});

	const metadata: Response = await response.json();

	const data = {
		status: response.status,
		metadata: metadata,
	};

	if (!response.ok) {
		if (+response.status === AUTHORIZATION_ERROR_STATUS) {
			if (typeof window !== undefined) {
			}
		}
	}

	return metadata;
};

class Http {
	static get<Response>(url: string) {
		const method: Method = "GET";
		return resquest<Response>(method, url);
	}

	/**
	 *
	 * @param url endPoint
	 * @param body body
	 * @param options
	 * @returns
	 */
	static post<Response>(url: string, body: any, options: Omit<CustomRequest, "body"> = {}) {
		const method: Method = "POST";
		return resquest<Response>(method, url, { ...options, body });
	}

	static put<Response>(url: string, body: any, options: Omit<CustomRequest, "body">) {
		const method: Method = "PUT";
		return resquest<Response>(method, url, { ...options, body });
	}

	static delete<Response>(url: string) {
		const method: Method = "DELETE";
		return resquest<Response>(method, url);
	}
}

export default Http;
