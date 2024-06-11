import { User } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";
import { UserType } from "../_schema/user/user.type";

class UserService {
	static async me() {
		return Http.get<ResponseApi<{ user: UserType }>>("/v1/api/account/me", { credentials: "include" });
	}

	static async uploadAvatar(file: User.uploadFile) {
		return Http.post<ResponseApi<{ user: UserType }>>("/v1/api/account/upload-avatar", file);
	}
}

export default UserService;
