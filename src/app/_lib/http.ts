import { redirect } from "next/navigation";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import {
	AUTHORIZATION_ERROR_STATUS,
	ConstructorError,
	ErrorPayload,
	HttpError,
	PERMISSION_ERROR_STATUS,
	PermissionError,
} from "./httpError";
import { getCookieValueHeader, normalizePath } from "./utils";
import { HeaderToken } from "@/type";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
	baseUrl?: string;
	pathName?: string;
};

class ClientToken {
	private _access_token: string = "";
	private _refresh_token: string = "";
	private _id: string = "";

	set id(id: string) {
		if (typeof window !== undefined) {
			this._id = id;
		}
	}

	get id() {
		return this._id;
	}

	set accessToken(at: string) {
		if (typeof window !== undefined) {
			console.log("set at");
			this._access_token = at;
		}
	}

	get accessToken() {
		return this._access_token;
	}

	set refreshToken(rf: string) {
		if (typeof window !== undefined) {
			this._refresh_token = rf;
		}
	}

	get refreshToken() {
		return this._refresh_token;
	}
}

export const clientToken = new ClientToken();

let NOT_RETRY: null | Promise<any> = null;

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
			? {}
			: {
					"Content-Type": "application/json",
			  };

	const baseUrl = options?.baseUrl === undefined ? process.env.BACK_END_URL : options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	console.log({ body, baseHeader, fullUrl, options, method });
	console.log("gọi api chính");
	const response = await fetch(fullUrl, {
		...options,
		headers: {
			...baseHeader,
			...options?.headers,
		} as any,
		body,
		method,
		credentials: "include",
	});

	const payload: Response = await response.json();

	console.log({ state: response.ok, payload });

	//RESPONSE: ERROR
	if (!response.ok) {
		//ERROR: ACCESS_TOKEN
		if (+response.status === AUTHORIZATION_ERROR_STATUS) {
			//TOKEN EXPRIES NEXT-CLIENT
			if (typeof window !== "undefined") {
				const option: RequestInit = {
					credentials: "include",
				};
				console.log("gọi api refresh");
				const callRefreshToken = await fetch(`${baseUrl}/v1/api/auth/refresh-token`, option);
				const refresh_api: ResponseApi<ResponseAuth> = await callRefreshToken.json();
				//validate refresh-token
				//---*---//

				//CASE: FAILED

				if (+refresh_api.code === PERMISSION_ERROR_STATUS) {
					const payloadError: ConstructorError = {
						status: +refresh_api.code,
						payload: payload as ErrorPayload,
					};
					console.log({ http: "token-client-side:::logout thooi" });
					throw new PermissionError(payloadError);
				}
				//CASE: SUCCESS
				else {
					const { access_token, refresh_token, code_verify_token } = refresh_api.metadata.token;
					const { client_id, expireToken } = refresh_api.metadata;
					//PROCESS SYNC TOKEN BETWEEN NEXT-CLIENT AND NEXT-SERVER
					const bodySyncTokenAPI = {
						access_token,
						refresh_token,
						client_id,
						code_verify_token,
						expireToken,
					};
					const syncToken = await fetch(`${process.env.CLIENT_URL}/v1/api/auth/set-token`, {
						body: JSON.stringify(bodySyncTokenAPI),
						method: "POST",
					});

					const tokenResponse = await syncToken.json();

					//AFTER

					//CALL API AGAIN WITH NEW TOKEN
					const call_again = await fetch(fullUrl, {
						method,
						body,
						credentials: "include",

						headers: {
							...baseHeader,
						} as any,
					});
					console.log({ call_again });

					if (!call_again.ok) {
						console.log("LOI");
					}

					//FINALLY
					const response_again: Response = await call_again.json();
					return response_again;
				}
			}
			//TOKEN EXPRIES NEXT-SERVER
			else {
				const pathName = options?.pathName;
				const cookies = response.headers.getSetCookie().toString();
				const code_verify_token = getCookieValueHeader("code_verify_token", cookies);

				redirect(`/refresh-token?code_verify_token=${code_verify_token},pathName=${pathName}`);
				// return "Dat";
			}
		} else {
			throw new HttpError({ status: 500 });
		}
	}
	if ("v1/api/auth/set-token".includes(normalizePath(url))) {
		localStorage.setItem("exprireToken", (payload as Omit<ResponseAuth, "user">).expireToken);
	}

	if (["v1/api/auth/login", "v1/api/auth/register"].some((path) => path === normalizePath(url))) {
		localStorage.setItem("exprireToken", (payload as ResponseApi<ResponseAuth>).metadata.expireToken);
		// const { access_token, code_verify_token, refresh_token } = (payload as ResponseApi<ResponseAuth>).metadata
		// 	.token;
		// const { client_id } = (payload as ResponseApi<ResponseAuth>).metadata;

		// const body = JSON.stringify({
		// 	access_token,
		// 	refresh_token,
		// 	client_id,
		// 	code_verify_token,
		// });

		// const setTokenResponse = await fetch(`${process.env.CLIENT_URL}/v1/api/auth/set-token`, {
		// 	body,
		// });
	}

	if (["v1/api/auth/logout"].includes(normalizePath(url))) {
		localStorage.removeItem("exprireToken");
	}

	return payload;
};

class Http {
	static get<Response>(url: string, options: Omit<CustomRequest, "body"> = {}) {
		const method: Method = "GET";
		return resquest<Response>(method, url, options);
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
		console.log({ options });
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
