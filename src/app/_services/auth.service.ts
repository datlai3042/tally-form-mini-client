import { TokenNextSync } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

class AuthService {
	static async refreshToken() {
		return await Http.get<ResponseApi<TokenNextSync>>("/v1/api/auth/refresh-token", { credentials: "include" });
	}
}

export default AuthService;
