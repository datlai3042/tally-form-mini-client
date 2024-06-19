import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import { generateInfoRequest, normalizePath, removeValueLocalStorage, setValueLocalStorage } from "./utils";
import { CustomRequest, Method, TokenNextSync } from "@/type";
import AuthService from "../_services/auth.service";
import { httpCaseErrorNextClient, httpCaseErrorNextServer } from "./httpCase";

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
	const { body, baseHeader, fullUrl } = generateInfoRequest(url, options as CustomRequest);
	console.log("gọi api chính", options);

	const optionsRequest: RequestInit = {
		...options,
		headers: {
			...baseHeader,
			...options?.headers,
		} as any,
		body,
		method,
		credentials: "include",
	};

	console.log({ optionsRequest, fullUrl });

	const response = await fetch(fullUrl, optionsRequest);

	//RESPONSE: ERROR
	if (!response.ok) {
		console.log({ response: response.status });
		//ERROR: ACCESS_TOKEN
		if (typeof window !== "undefined") {
			const result = await httpCaseErrorNextClient<Response>(
				response,
				+response.status,
				method,
				url,
				fullUrl,
				optionsRequest
			);
			return result;
		} else {
			return await httpCaseErrorNextServer(+response.status, options as CustomRequest);
		}
	}

	const payload: Response = await response.json();

	if ("v1/api/auth/set-token".includes(normalizePath(url))) {
		const expireTokenJSON = (payload as TokenNextSync).expireToken;
		setValueLocalStorage("expireToken", expireTokenJSON);

		const codeVerifyTokenJSON = (payload as TokenNextSync).code_verify_token;
		setValueLocalStorage("code_verify_token", codeVerifyTokenJSON);
	}

	if (["v1/api/auth/login", "v1/api/auth/register"].some((path) => path === normalizePath(url))) {
		const expireTokenJSON = (payload as ResponseApi<ResponseAuth>).metadata.expireToken;
		setValueLocalStorage("expireToken", expireTokenJSON);

		const codeVerifyTokenJSON = (payload as ResponseApi<ResponseAuth>).metadata.token.code_verify_token;
		setValueLocalStorage("code_verify_token", codeVerifyTokenJSON);

		await AuthService.syncNextToken(payload as ResponseApi<ResponseAuth>);
	}

	if (["v1/api/auth/logout"].includes(normalizePath(url))) {
		// removeValueLocalStorage("expireToken");
		// removeValueLocalStorage("code_verify_token");
	}

	return payload;
};

class Http {
	static get<Response>(url: string, options: Omit<CustomRequest, "body"> = {}) {
		const method: Method = "GET";
		console.log(options, url);
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
