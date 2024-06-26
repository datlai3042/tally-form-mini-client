import { redirect } from "next/navigation";
import AuthService from "../_services/auth.service";
import {
	AUTHORIZATION_ERROR_STATUS,
	BADREQUEST_ERROR_STATUS,
	ErrorResponse,
	HttpError,
	NOTFOUND_ERROR_STATUS,
	NotFoundError,
	PERMISSION_ERROR_STATUS,
} from "./httpError";
import { CustomRequest, Method } from "@/type";
import { removeValueLocalStorage } from "./utils";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import { toast } from "@/components/ui/use-toast";
import { addOneToastError, addOneToastSuccess, addOneToastWarning } from "./redux/features/toast.slice";

import { v4 as uuidv4 } from "uuid";
import store from "./redux/store";

type RetryAPI = RequestInit;

export const httpCaseErrorNextClient = async <TResponse>(
	response: Response,
	statusCode: number,
	method: Method,
	url: string,
	fullUrl: string,
	options: RetryAPI
) => {
	const abort = new AbortController();
	const signal = abort.signal;
	const msg = JSON.parse(await response.text()) as unknown as ErrorResponse;

	switch (statusCode) {
		case AUTHORIZATION_ERROR_STATUS:
			const urlAuthentication = ["/v1/api/auth/login", "/v1/api/auth/register"];
			if (urlAuthentication.includes(url)) {
				const _id = uuidv4();
				console.log(msg);
				store.dispatch(
					addOneToastError({
						toast_item: {
							_id,
							toast_title: "Lỗi xác thực",
							core: { message: msg.metadata },
							type: "ERROR",
						},
					})
				);
				throw new Error(msg.metadata);
			}
			return await nextClient401<TResponse>(fullUrl, options, signal);

		case PERMISSION_ERROR_STATUS:
			return await nextClient403(url);

		case NOTFOUND_ERROR_STATUS:
			toast({
				title: msg.message + "  -  " + msg.code,
				description: msg.metadata,
				variant: "destructive",
			});
			throw new NotFoundError({ payload: { message: msg.message, detail: msg.metadata } });

		case BADREQUEST_ERROR_STATUS:
			toast({
				title: msg.message + "  -  " + msg.code,
				description: msg.metadata,
				variant: "destructive",
			});
			throw new NotFoundError({ payload: { message: msg.message, detail: msg.metadata } });

		default:
			throw new HttpError({ status: 500 });
	}
};

let refreshTokenPromise: Promise<ResponseApi<ResponseAuth>> | null = null;
export const nextClient401 = async <Response>(fullUrl: string, options: RetryAPI, signal?: AbortSignal) => {
	if (!refreshTokenPromise) {
		refreshTokenPromise = AuthService.refreshTokenClient(signal).finally(() => (refreshTokenPromise = null));
		//CASE: FAILED
		//AFTER
		//CALL API AGAIN WITH NEW TOKEN
	}
	return refreshTokenPromise.then(async (res) => {
		if (+res.code === PERMISSION_ERROR_STATUS) {
			// AuthService.tokenPermission(res.code, payload as ErrorPayload);
			await AuthService.logoutNextClient();
			return redirect("/");
		}
		//CASE: SUCCESS
		console.log("async");
		const { access_token, code_verify_token, refresh_token } = res.metadata.token;
		const { client_id, expireToken } = res.metadata;

		const params = { access_token, code_verify_token, refresh_token, client_id, expireToken };
		await AuthService.syncNextToken(params);
		const call_again = await fetch(fullUrl, options);

		if (!call_again.ok) {
			redirect("/errors/internal-server-error");
			// throw new HttpError({ status: 500 });
		}

		//FINALLY
		const response_again: Response = await call_again.json();

		return response_again;
	});
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
	console.log({ statusCode });
	switch (statusCode) {
		case AUTHORIZATION_ERROR_STATUS:
			return await nextServer401(options);

		case PERMISSION_ERROR_STATUS:
			return await nextServer403(options);

		default:
			redirect("/errors/internal-server-error");

		// throw new HttpError({ status: 500 });
	}
};

export const nextServer401 = async (options: CustomRequest) => {
	return AuthService.tokenExpireRedrict(options as CustomRequest);
};

export const nextServer403 = async (options: CustomRequest) => {
	console.log("OK");
	return await AuthService.logoutNextServer(options as CustomRequest);
};
