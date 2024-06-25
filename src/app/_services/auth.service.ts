import { CustomRequest, MessageResponse, TokenNextSync } from "@/type";
import Http from "../_lib/http";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";
import { getCookieValueHeader, removeValueLocalStorage, setValueLocalStorage } from "../_lib/utils";
import { redirect } from "next/navigation";
import { ConstructorError, ErrorPayload, PermissionError } from "../_lib/httpError";
import { object } from "zod";

type FuncAuth = () => ResponseApi<ResponseAuth>;

class AuthService {
	static async register<Body, Response extends ResponseApi<ResponseAuth>>(body: Body) {
		return Http.post<Response>("/v1/api/auth/register", body, {});
	}

	static async login<Body, Response>(body: Body) {
		return Http.post<Response>("/v1/api/auth/login", body);
	}

	static async logoutNextClient() {
		const urlRequestBackEnd = "v1/api/auth/logout";
		const urlRequestNextServer = "v1/api/auth/next-logout";
		const options = { baseUrl: "" };
		try {
			const logoutResponse = await Http.post<ResponseApi<MessageResponse>>(
				urlRequestBackEnd,
				{ force: true },
				{}
			);
		} catch {}
		const logoutResponseServer = await Http.post<ResponseApi<MessageResponse>>(
			urlRequestNextServer,
			object,
			options
		);

		removeValueLocalStorage("expireToken");
		removeValueLocalStorage("code_verify_token");
		if (typeof window !== "undefined") {
			return (window.location.href = "/login");
		}
		return null;
	}

	static async logoutNextServer(options: CustomRequest) {
		const cookies = (options?.headers as any)["Cookie"];

		const code_verify_token = getCookieValueHeader("code_verify_token", cookies);
		const force = getCookieValueHeader("force", cookies);

		return redirect(`/logout?code_verify_token=${code_verify_token}&force=${force}`);
	}

	static async refreshTokenServer(signal?: AbortSignal) {
		const res = await Http.get<ResponseApi<ResponseAuth>>("/v1/api/auth/refresh-token", {
			credentials: "include",
			signal,
		});
		const { access_token, refresh_token, code_verify_token } = res.metadata.token;
		const { client_id, expireToken } = res.metadata;

		const body = {
			access_token,
			refresh_token,
			client_id,
			expireToken,
			code_verify_token,
		};

		const syncToken = await Http.post<TokenNextSync>("/v1/api/auth/set-token", body, { baseUrl: "", signal });

		console.log("da xet local");

		return syncToken;
	}

	static async refreshTokenClient(signal?: AbortSignal) {
		console.log({ mode: process.env.NEXT_PUBLIC_MODE });
		const option: RequestInit = {
			credentials: "include",
		};

		const urlRequest = process.env.NEXT_PUBLIC_MODE === "DEV" ? "http://localhost:4000" : process.env.BACK_END_URL;

		const callRefreshToken: ResponseApi<ResponseAuth> = await Http.get<ResponseApi<ResponseAuth>>(
			`/v1/api/auth/refresh-token`,
			undefined
		);
		return callRefreshToken;
	}

	static async syncNextToken({
		access_token,
		refresh_token,
		code_verify_token,
		client_id,
		expireToken,
	}: {
		access_token: string;
		refresh_token: string;
		code_verify_token: string;
		client_id: string;
		expireToken: string;
	}) {
		const bodySyncTokenAPI = {
			access_token,
			refresh_token,
			client_id,
			code_verify_token,
			expireToken,
		};

		const urlRequest = process.env.NEXT_PUBLIC_MODE === "DEV" ? "http://localhost:3000" : process.env.CLIENT_URL;

		const syncToken = await fetch(`${urlRequest}/v1/api/auth/set-token`, {
			body: JSON.stringify(bodySyncTokenAPI),
			method: "POST",
		});
		setValueLocalStorage("expireToken", expireToken);

		setValueLocalStorage("code_verify_token", code_verify_token);
	}

	static async tokenExpireRedrict(options: CustomRequest) {
		const pathName = options?.pathName;
		const cookies = (options?.headers as any)["Cookie"];

		const code_verify_token = getCookieValueHeader("code_verify_token", cookies);

		return redirect(`/v1/api/token/refresh-token?code_verify_token=${code_verify_token}&pathName=${pathName}`);
	}

	static async tokenPermission(statusCode: number, payload: ErrorPayload) {
		const payloadError: ConstructorError = {
			status: +statusCode,
			payload: payload as ErrorPayload,
		};
		console.log({ http: "token-client-side:::logout thooi" });
		throw new PermissionError(payloadError);
	}
}

export default AuthService;
