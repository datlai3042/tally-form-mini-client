import { redirect } from "next/navigation";
import AuthService from "../_services/auth.service";
import { AUTHORIZATION_ERROR_STATUS, HttpError, PERMISSION_ERROR_STATUS } from "./httpError";
import { CustomRequest, Method } from "@/type";
import { removeValueLocalStorage } from "./utils";

type RetryAPI = RequestInit;

export const httpCaseErrorNextClient = async <Response>(
	statusCode: number,
	method: Method,
	url: string,
	fullUrl: string,
	options: RetryAPI
) => {
	switch (statusCode) {
		case AUTHORIZATION_ERROR_STATUS:
			return await nextClient401<Response>(method, fullUrl, options);

		case PERMISSION_ERROR_STATUS:
			return await nextClient403(url);

		default:
			throw new HttpError({ status: 500 });
	}
};

export const nextClient401 = async <Response>(method: Method, fullUrl: string, options: RetryAPI) => {
	const refresh_api = await AuthService.refreshTokenClient();
	//CASE: FAILED

	if (+refresh_api.code === PERMISSION_ERROR_STATUS) {
		// AuthService.tokenPermission(refresh_api.code, payload as ErrorPayload);
		await AuthService.logoutNextClient();
		return redirect("/");
	}
	//CASE: SUCCESS
	await AuthService.syncNextToken(refresh_api);
	//AFTER
	//CALL API AGAIN WITH NEW TOKEN
	const call_again = await fetch(fullUrl, options);

	if (!call_again.ok) {
		throw new HttpError({ status: 500 });
	}

	//FINALLY
	const response_again: Response = await call_again.json();
	return response_again;
};

export const nextClient403 = async (url: string) => {
	if (url === "v1/api/auth/logout") {
		if (typeof window !== "undefined") {
			removeValueLocalStorage("expireToken");
			removeValueLocalStorage("code_verify_token");
			window.location.href = "/";
		}
	} else {
		await AuthService.logoutNextClient();
	}
	return redirect("/");
};

/// NEXT_SERVER_ROOM
export const httpCaseErrorNextServer = async (statusCode: number, options: CustomRequest) => {
	switch (statusCode) {
		case AUTHORIZATION_ERROR_STATUS:
			return await nextServer401(options);

		case PERMISSION_ERROR_STATUS:
			return await nextServer403(options);

		default:
			throw new HttpError({ status: 500 });
	}
};

export const nextServer401 = async (options: CustomRequest) => {
	return AuthService.tokenExpireRedrict(options as CustomRequest);
};

export const nextServer403 = async (options: CustomRequest) => {
	return await AuthService.logoutNextServer(options as CustomRequest);
};
