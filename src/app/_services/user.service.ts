import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";
import { UserType } from "../_schema/user/user.type";

class UserService {
	static async me() {
		console.log("goi api");
		return Http.get<ResponseApi<{ user: UserType }>>("/v1/api/account/me", { credentials: "include" });
	}
}

export default UserService;
