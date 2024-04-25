import { TokenNextSync } from "@/type";
import Http from "../_lib/http";
import { ResponseApi, ResponseAuth } from "../_schema/api/response.shema";

class AuthService {
	static async refreshToken(signal?: AbortSignal) {
		const res = await Http.get<ResponseApi<ResponseAuth>>("/v1/api/auth/refresh-token", {
			credentials: "include",
			signal,
		});
		const { access_token, refresh_token, code_verify_token } = res.metadata.token;
		const { client_id, expireToken } = res.metadata;
		const body = JSON.stringify({
			access_token,
			refresh_token,
			client_id,
			expireToken,
			code_verify_token,
		});

		const syncToken = await Http.post<TokenNextSync>("/v1/api/auth/set-token", body, { baseUrl: "" });
		return syncToken;
	}
}

export default AuthService;
